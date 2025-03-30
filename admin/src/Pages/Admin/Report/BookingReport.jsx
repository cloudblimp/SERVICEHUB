import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
import { Tag } from "primereact/tag";
import { MultiSelect } from "primereact/multiselect";
import { getdata } from "../../../services/Apis";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { reportLandscapeImg } from "../../../images/bas64logo";
function BookingReport() {
  const [mdetails, setMDetails] = useState([]);
  const [filters, setFilters] = useState({
    "Customer Name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "Sp Name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "service_id.mini_cat_id.mini_cat_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    available_date: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    available_time: {
      value: null,
      matchMode: FilterMatchMode.EQUALS,
    },
    payment_status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const statusBodyTemplate = (rowData) => {
    let tag;
    let color;
    switch (rowData.booking_status) {
      case 2:
        tag = "Cancelled";
        color = "bg-red-500";
        break;
      case 1:
        tag = "Success";
        color = "bg-green-500";
        break;
      case 0:
        tag = "Pending";
        color = "bg-blue-gray-500";
        break;
      default:
        tag = "Unknown";
        break; // You might want to handle other cases as well
    }
    return <Tag value={tag} className={color} />;
  };
  const PstatusBodyTemplate = (rowData) => {
    let tag;
    let color;
    switch (rowData.payment_status) {
      case 2:
        tag = "Cancelled";
        color = "bg-red-500";
        break;
      case 1:
        tag = "Success";
        color = "bg-green-500";
        break;
      case 0:
        tag = "Pending";
        color = "bg-blue-gray-500";
        break;
      default:
        tag = "Unknown";
        break; // You might want to handle other cases as well
    }
    return <Tag value={tag} className={color} />;
  };
  const fullNameBodyTemplate = (rowData) => {
    const fullName = `${rowData.user_id.firstName} ${rowData.user_id.lastName}`;
    return <span>{fullName}</span>;
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
      field: "customer", // Leave it empty as we'll define the data in the body template
      header: "Customer Name",
      filterPlaceholder: "Search by Name",
      filterField: "customer",
    },
    {
      field: "Sp Name",
      header: "Sp Name",
      filterPlaceholder: "Search by Name",
      body: { SpNameBodyTemplate },
      filterField: "service_id.sp_id.firstName",
    },
    {
      field: "service_id.mini_cat_id.mini_cat_name",
      header: "Service Name",
      filterPlaceholder: "Search by Name",
      filterField: "service_id.mini_cat_id.mini_cat_name",
    },
    {
      field: "available_date",
      header: "Booking Date",
      filterPlaceholder: "Search by Name",
      filterField: "available_date",
    },
    {
      field: "available_time",
      header: "Booking Time",
      filterPlaceholder: "Search by time",
      filterField: "available_time",
    },
    {
      field: "booking_status",
      header: "Booking Status",
      filterPlaceholder: "Search by Email",
      body: { statusBodyTemplate },
      filterField: "booking_status",
    },
    {
      field: "payment_status",
      header: "Payment Status",
      filterPlaceholder: "Search by Email",
      body: { PstatusBodyTemplate },
      filterField: "payment_status",
    },
  ];

  useEffect(() => {
    fetchminicatData();
  }, []);

  const fetchminicatData = async () => {
    try {
      const response = await getdata("/serviceReq/getAllServiceReq");
      setMDetails(response.data.data);
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
    var text = "Booking Report";
    var today = new Date().toLocaleDateString();
    var date = "Date: " + today;
    var textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;

    var pageWidth = doc.internal.pageSize.width;
    var x = (pageWidth - textWidth) / 2;

    doc.text(text, x, 235);
    doc.text(date, 4, 200);
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
        if (col.header === "Customer Name") {
          return `${row.user_id.firstName} ${row.user_id.lastName} `; // Access nested data
        } else if (col.header === "Sp Name") {
          return `${row.service_id.sp_id.firstName} ${row.service_id.sp_id.lastName} `;
        } else if (col.header === "Service Name") {
          return row.service_id.mini_cat_id.mini_cat_name; // Access nested data
        } else if (col.header === "Booking Status") {
          // Map numeric status to string
          switch (row.booking_status) {
            case 2:
              return "Cancelled";
            case 1:
              return "Success";
            case 0:
              return "Pending";
            default:
              return "Unknown";
          }
        } else if (col.header === "Payment Status") {
          // Map numeric status to string
          switch (row.payment_status) {
            case 2:
              return "Cancelled";
            case 1:
              return "Success";
            case 0:
              return "Pending";
            default:
              return "Unknown";
          }
        } else {
          return row[col.dataKey]; // Access non-nested data
        }
      })
    );

    doc.autoTable(customHeaders, bodyData, tableOptions);

    doc.save("BookingReport.pdf");
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
  console.log("m", mdetails);
  return (
    <>
      <h1 className="text-3xl mb-3">Booking Report</h1>
      <DataTable
        value={mdetails}
        paginator
        rows={5}
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
            filterField={col.filterField}
            body={
              col.header === "Sp Name"
                ? SpNameBodyTemplate
                : col.header === "Booking Status"
                ? statusBodyTemplate
                : col.header === "Payment Status"
                ? PstatusBodyTemplate
                : undefined
            }
          />
        ))}
      </DataTable>
    </>
  );
}

export default BookingReport;
