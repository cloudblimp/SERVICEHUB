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
function FeedbackReport() {
  const [mdetails, setMDetails] = useState([]);
  const [filters, setFilters] = useState({
    "user_id.firstName": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "service_id.sp_id.firstName": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "service_id.mini_cat_id.mini_cat_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    rating: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const ratingBodyTemplate = (product) => {
    return <Rating value={product.rating} readOnly cancel={false} />;
  };

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
      field: "user_id.firstName",
      header: "User Name",
      filterPlaceholder: "Search by Name",
      body: { fullNameBodyTemplate },
      filterField: "user_id.firstName",
    },
    {
      field: "service_id.sp_id.firstName",
      header: "Sp Name",
      filterPlaceholder: "Search by Name",
      body: { SpNameBodyTemplate },
      filterField: "service_id.sp_id.firstName",
    },
    {
      field: "service_id.mini_cat_id.mini_cat_name",
      header: "Mini cat name",
      filterPlaceholder: "Search by Name",
      filterField: "service_id.mini_cat_id.mini_cat_name",
    },
    {
      field: "rating",
      header: "Rating ",
      filterPlaceholder: "Search by Rating",
      body: { ratingBodyTemplate },
      filterField: "rating",
    },
    {
      field: "comment",
      header: "Feedback",
    },
  ];

  useEffect(() => {
    fetchminicatData();
  }, []);

  const fetchminicatData = async () => {
    try {
      const response = await getdata("/feedback/getAllFeedback");
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
    var text = "Feedback Report";
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
      startY: 265,
      headStyles: {
        fillColor: [173, 149, 81],
        textColor: 0,
        fontStyle: "bold",
        halign: "center",
        lineWidth: 1,
        lineColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
        cellPadding: 8,
        lineWidth: 1,
        lineColor: [0, 0, 0],
      },
      bodyStyles: {
        textColor: 0,
        fontStyle: "normal",
        halign: "left",
        lineWidth: 1,
        lineColor: [0, 0, 0],
      },
    };

    const customHeaders = exportColumns.map((col) => col.header);

    // Generate the body data
    const bodyData = mdetails.map((row) =>
      exportColumns.map((col) => {
        if (col.header === "User Name") {
          return `${row.user_id.firstName} ${row.user_id.lastName}`; // Access nested data
        } else if (col.header === "Sp Name") {
          return `${row.service_id.sp_id.firstName} ${row.service_id.sp_id.lastName}`; // Access nested data
        } else if (col.header === "Mini cat name") {
          return row.service_id.mini_cat_id.mini_cat_name; // Access nested data
        } else {
          return row[col.dataKey]; // Access non-nested data
        }
      })
    );

    doc.autoTable(customHeaders, bodyData, tableOptions);

    doc.save("FeedbackReport.pdf");
  };

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };
  console.log("m", visibleColumns);
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
      <h1 className="text-3xl mb-3">Feedback Report</h1>
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
            filter={col.field == "comment" ? false : true}
            body={
              col.header === "User Name"
                ? fullNameBodyTemplate
                : col.header === "Sp Name"
                ? SpNameBodyTemplate
                : col.field === "rating"
                ? ratingBodyTemplate
                : undefined
            }
          />
        ))}
      </DataTable>
    </>
  );
}

export default FeedbackReport;
