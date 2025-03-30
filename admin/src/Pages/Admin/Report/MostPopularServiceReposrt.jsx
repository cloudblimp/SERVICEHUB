import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { MultiSelect } from "primereact/multiselect";
import { getdata } from "../../../services/Apis";
import { FilterMatchMode } from "primereact/api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { reportLandscapeImg } from "../../../images/bas64logo";
function MostPopularServiceReport() {
  const [mdetails, setMDetails] = useState([]);
  const [filters, setFilters] = useState({
    "": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "": {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

  const columns = [
    {
      field: "nestedCategoryName",
      header: "Mini category name",
      filterPlaceholder: "Search by Name",
      filterField: "service_id.mini_cat_id.mini_cat_name",
    },
    {
      field: "requestCount",
      header: "Total Orders",
      filterPlaceholder: "Search by Count",
    },
  ];

  useEffect(() => {
    fetchserviceBooked();
  }, []);

  const fetchserviceBooked = async () => {
    try {
      const serviceReqResponse = await getdata("/serviceReq/getAllServiceReq");
      const nestedCatResponse = await getdata("/nestedcat/getAllNestCat");
      const serviceRequests = serviceReqResponse.data.data;
      const nestedCategories = nestedCatResponse.data.data; // Assuming this is the correct response structure

      // Count the number of requests for each nested category
      const requestCounts = {};
      serviceRequests.forEach((request) => {
        const nestedCategoryName =
          request.service_id.mini_cat_id.nested_cat_id.nest_category_name;
        requestCounts[nestedCategoryName] =
          (requestCounts[nestedCategoryName] || 0) + 1;
      });

      // Assign nested category name and request count
      const updatedMDetails = nestedCategories.map((category) => ({
        nestedCategoryName: category.nest_category_name,
        requestCount: requestCounts[category.nest_category_name] || 0,
      }));

      setMDetails(updatedMDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const exportPdf = () => {
    const exportColumns = visibleColumns.map((col) => ({
      header: col.header,
      dataKey: col.field,
    }));
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 5;

    const doc = new jsPDF(orientation, unit, size, marginLeft);
    const dummyImage = reportLandscapeImg;

    const imageWidth = 845;
    const imageHeight = 195;
    const imageX = 0;
    const imageY = 3;

    doc.addImage(dummyImage, "PNG", imageX, imageY, imageWidth, imageHeight);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    var text = "Most Popular Service Report";
    const today = new Date().toLocaleDateString();
    var date = "Date: " + today;
    var textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;

    var pageWidth = doc.internal.pageSize.width;
    var x = (pageWidth - textWidth) / 2;

    doc.text(text, x, 235);
    doc.text(date, 0, 200);
    const tableOptions = {
      startY: 265, // Adjust the starting Y position of the table
      headStyles: {
        //Header styles
        fillColor: [173, 149, 81], // Header color (ajeeb sa gold in this case)
        textColor: 0, // Header text color (black in this case)
        fontStyle: "bold", // Header font style
        halign: "center", // Header text alignment
        lineWidth: 1, // Header border width
        lineColor: [0, 0, 0], // Header border color (black in this case)
      },
      styles: {
        fontSize: 10, // Font size
        cellPadding: 8, // Cell padding
        lineWidth: 1, // Border width
        lineColor: [0, 0, 0], // Border color (black in this case)
      },
      bodyStyles: {
        // Body styles
        textColor: 0, // Body text color (black in this case)
        fontStyle: "normal", // Body font style
        halign: "left", // Body text alignment
        lineWidth: 1, // Body border width
        lineColor: [0, 0, 0], // Body border color (black in this case)
      },
    };
    const customHeaders = exportColumns.map((col) => col.header);
    const bodyData = mdetails.map((row) =>
      exportColumns.map((col) => {
        if (col.header === "User Full Name") {
          return `${row.user_id.firstName} ${row.user_id.lastName} `; // Access nested data
        } else if (col.header === "Sp Name") {
          return `${row.service_id.sp_id.firstName} ${row.service_id.sp_id.lastName} `; // Access nested data
        } else if (col.header === "Mini cat name") {
          return row.service_id.mini_cat_id.mini_cat_name; // Access nested data
        } else {
          return row[col.dataKey]; // Access non-nested data
        }
      })
    );

    doc.autoTable(customHeaders, bodyData, tableOptions);

    doc.save("MostPopularServiceReport.pdf");
  };

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const header = (
    <>
      <MultiSelect
        value={visibleColumns}
        options={columns}
        optionLabel="header"
        onChange={onColumnToggle}
        className="w-full sm:w-20rem"
        display="chip"
        filter={filters}
      />
      <Button
        type="button"
        label="PDF"
        severity="warning"
        rounded
        onClick={() => exportPdf(visibleColumns)}
        data-pr-tooltip="PDF"
        className="bg-red-500 text-white mt-2  rounded-lg shadow-md p-2"
      />
    </>
  );

  return (
    <>
      <h1 className="text-3xl mb-3">MostPopular Service Report</h1>
      <DataTable
        value={mdetails}
        paginator
        rows={5}
        rowsPerPageOptions={5}
        filterDisplay="row"
        emptyMessage="No customers found."
        header={header}
        tableStyle={{ minWidth: "50rem" }}
        id="mytable"
      >
        {visibleColumns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            filterPlaceholder={col.filterPlaceholder}
            filter
          />
        ))}
      </DataTable>
    </>
  );
}

export default MostPopularServiceReport;
