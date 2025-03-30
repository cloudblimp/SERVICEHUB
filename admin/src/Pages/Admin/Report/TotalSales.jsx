import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";

import { MultiSelect } from "primereact/multiselect";
import { getdata } from "../../../services/Apis";
import { FilterMatchMode } from "primereact/api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { reportLandscapeImg } from "../../../images/bas64logo";
function FeedbackReport() {
  const [mdetails, setMDetails] = useState([]);
  const [filters, setFilters] = useState({
    "service_id.mini_cat_id.mini_cat_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "service_id.sp_id.firstName": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    customer: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    phoneNo: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    price: {
      value: null,
      matchMode: FilterMatchMode.EQUALS,
    },
    // payment_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const fullNameBodyTemplate = (rowData) => {
    return (
      <span>
        {rowData.user_id.firstName} {rowData.user_id.lastName}
      </span>
    );
  };
  const SpNameBodyTemplate = (rowData) => {
    return (
      <span>
        {rowData.service_id.sp_id.firstName} {rowData.service_id.sp_id.lastName}
      </span>
    );
  };

  const columns = [
    {
      field: "service_id.mini_cat_id.mini_cat_name", // Leave it empty as we'll define the data in the body template
      header: "Service Name",
      filterPlaceholder: "Search by Name",
      filterField: "service_id.mini_cat_id.mini_cat_name",
    },
    {
      field: "customer", // Leave it empty as we'll define the data in the body template
      header: "Customer Name",
      filterPlaceholder: "Search by Name",
      filterField: "customer",
    },
    {
      field: "service_id.sp_id.firstName",
      header: "Sp Name",
      filterPlaceholder: "Search by Name",
      body: { SpNameBodyTemplate },
      filterField: "service_id.sp_id.firstName",
    },
    {
      field: "phoneNo", // Leave it empty as we'll define the data in the body template
      header: "Phone No",
      filterPlaceholder: "Search by Name",
      filterField: "phoneNo",
    },
    {
      field: "address", // Leave it empty as we'll define the data in the body template
      header: "Address",
      filterPlaceholder: "Search by Name",
      filterField: "address",
    },
    {
      field: "price", // Leave it empty as we'll define the data in the body template
      header: "Price(Rs)",
      filterPlaceholder: "Search by Price",
      filterField: "price",
    },
  ];

  useEffect(() => {
    fetchminicatData();
  }, []);

  const fetchminicatData = async () => {
    try {
      const response = await getdata("/serviceReq/getAllServiceReq");
      const filteredData = response.data.data.filter(
        (item) => item.order_status == 1
      );
      setMDetails(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const exportPdf = () => {
    const exportColumns = visibleColumns.map((col) => ({
      header: col.header,
      dataKey: col.field,
    }));

    // Calculate total price
    let totalPrice = 0;
    mdetails.forEach((row) => {
      totalPrice += row.price;
    });

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
    var text = "Total Sales Report";
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
      footStyles: {
        // Footer styles
        fontSize: 12, // Font size
        fontStyle: "bold", // Font style
        textColor: [0, 0, 0], // Text color (black in this case)
        halign: "right", // Text alignment
      },
      didDrawPage: (data) => {
        // Add footer
        doc.text(
          `Total Price: ${totalPrice}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    };

    const customHeaders = exportColumns.map((col) => col.header);

    // Add extra row for total price
    const totalPriceRow = exportColumns.map((col) => {
      return col.header === "Price(Rs)" ? "Total Price: " + totalPrice : ""; // Only add total price to the "Price" column
    });
    const bodyData = mdetails.map((row) =>
      exportColumns.map((col) => {
        if (col.header === "User Full Name") {
          return `${row.user_id.firstName} ${row.user_id.lastName} `;
        } else if (col.header === "Sp Name") {
          return `${row.service_id.sp_id.firstName} ${row.service_id.sp_id.lastName} `;
        } else if (col.header === "Mini cat name") {
          return row.service_id.mini_cat_id.mini_cat_name;
        } else if (col.header === "Service Name") {
          return row.service_id.mini_cat_id.mini_cat_name;
        } else {
          return row[col.dataKey];
        }
      })
    );

    doc.autoTable(
      customHeaders,
      bodyData.concat([totalPriceRow]),
      tableOptions
    );

    doc.save("TotalSalesReport.pdf");
  };

  console.log("m", mdetails);

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
        className="w-full md:w-20rem"
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
      <h1 className="text-3xl mb-3">Total Sales Report</h1>
      <div className="overflow-x-auto">
        <DataTable
          value={mdetails}
          paginator
          rows={5}
          sortable
          rowsPerPageOptions={5}
          filterDisplay="row"
          emptyMessage="No customers found."
          header={header}
          id="mytable"
          className="max-w-[75rem]"
        >
          {visibleColumns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              filterPlaceholder={col.filterPlaceholder}
              filter={col.field == "comment" ? false : true}
              body={
                col.header === "User Full Name"
                  ? fullNameBodyTemplate
                  : col.header === "Sp Name"
                  ? SpNameBodyTemplate
                  : undefined
              }
            />
          ))}
        </DataTable>
      </div>
    </>
  );
}

export default FeedbackReport;
