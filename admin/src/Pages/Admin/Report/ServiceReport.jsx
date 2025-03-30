import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { getdata } from "../../../services/Apis";
import { FilterMatchMode } from "primereact/api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { reportLandscapeImg } from "../../../images/bas64logo";
function ServiceReport() {
  const [mdetails, setMDetails] = useState([]);

  const [filters, setFilters] = useState({
    "mini_cat_id.mini_cat_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    mini_cat_name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    price: {
      value: null,
      matchMode: FilterMatchMode.EQUAL_TO,
    },
    "mini_cat_id.min_price": {
      value: null,
      matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
    },
    "mini_cat_id.max_price": {
      value: null,
      matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
    },
    "mini_cat_id.nested_cat_id.nest_category_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "mini_cat_id.nested_cat_id.sub_cat_id.sub_category_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "mini_cat_id.nested_cat_id.sub_cat_id.s_id.service_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "sp_availability.dayOfWeek": {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    "sp_id.firstName": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    created_at: {
      value: null,
      matchMode: FilterMatchMode.EQUAL_TO,
    },
    service_time: {
      value: null,
      matchMode: FilterMatchMode.EQUAL_TO,
    },
  });
  const columns = [
    {
      field: "mini_cat_id.mini_cat_name",
      header: "Service Name",
      filterPlaceholder: "Search by Name",
      width: "200px",
    },
    {
      field: "price",
      header: "Price (Rs)",
      filterPlaceholder: "Search by Price",
      width: "100px",
    },
    {
      field: "mini_cat_id.min_price",
      header: "Min Price (Rs)",
      filterPlaceholder: "Search by Name",
      width: "100px",
    },
    {
      field: "mini_cat_id.max_price",
      header: "Max Price (Rs)",
      filterPlaceholder: "Search by Email",
      width: "100px",
    },
    {
      field: "mini_cat_id.nested_cat_id.nest_category_name",
      header: "Nested category",
      filterPlaceholder: "Search by Email",
      width: "200px",
    },
    {
      field: "mini_cat_id.nested_cat_id.sub_cat_id.sub_category_name",
      header: "Sub category Name",
      filterPlaceholder: "Search by Email",
      width: "200px",
    },
    {
      field: "mini_cat_id.nested_cat_id.sub_cat_id.s_id.service_name",
      header: "Category name",
      filterPlaceholder: "Search by Email",
      width: "200px",
    },
    {
      field: "service_time",
      header: "Service Time (hrs)",
      filterPlaceholder: "Search by Email",
    },
    {
      field: "created_at",
      header: "Created At",
      filterPlaceholder: "Search by date",
    },
    {
      field: "sp_id.firstName",
      header: "Sp Name",
      filterPlaceholder: "Search by date",
    },
    {
      field: "sp_availability.dayOfWeek",
      header: "Sp Availability",
      filterPlaceholder: "Search by date",
    },
  ];

  useEffect(() => {
    fetchserviceData();
  }, []);

  const fetchserviceData = async () => {
    try {
      const response = await getdata("/service/getAllService");
      setMDetails(response.data.data);
      console.log(response.data.data);
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
    var text = "Service Report";
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
        if (col.header === "Nested category") {
          return row.mini_cat_id.nested_cat_id.nest_category_name; // Access nested data
        } else if (col.header === "Sub category Name") {
          return row.mini_cat_id.nested_cat_id.sub_cat_id.sub_category_name; // Access nested data
        } else if (col.header === "Category name") {
          return row.mini_cat_id.nested_cat_id.sub_cat_id.s_id.service_name; // Access nested data
        } else if (col.header === "Sp Availability") {
          return row.sp_availability.dayOfWeek; // Access nested data
        } else if (col.header === "Sp Name") {
          return row.sp_id.firstName; // Access nested data
        } else if (col.header === "Max Price (Rs)") {
          return row.mini_cat_id.max_price; // Access nested data
        } else if (col.header === "Min Price (Rs)") {
          return row.mini_cat_id.min_price; // Access nested data
        } else if (col.header === "Service Name") {
          return row.mini_cat_id.mini_cat_name; // Access nested data
        } else {
          return row[col.dataKey]; // Access non-nested data
        }
      })
    );

    doc.autoTable(customHeaders, bodyData, tableOptions);

    doc.save("ServiceReport.pdf");
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
      <h1 className="text-3xl mb-3">Service Table</h1>
      <div>
        <DataTable
          value={mdetails}
          paginator
          rows={5}
          filterDisplay="row"
          rowsPerPageOptions={4}
          emptyMessage="No customers found."
          header={header}
          id="mytable"
          className="max-w-[80rem] overflow-x-auto"
        >
          {visibleColumns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              filterPlaceholder={col.filterPlaceholder}
              filter
              headStyles={{ border: "2px solid black" }}
            />
          ))}
        </DataTable>
      </div>
    </>
  );
}

export default ServiceReport;
