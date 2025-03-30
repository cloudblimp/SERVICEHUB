import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { MultiSelect } from "primereact/multiselect";
import { getdata } from "../../../services/Apis";
import { FilterMatchMode } from "primereact/api";
import { classNames } from "primereact/utils";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { reportLandscapeImg } from "../../../images/bas64logo";

function ServiceProviderReport() {
  const [mdetails, setMDetails] = useState([]);
  const [filters, setFilters] = useState({
    firstName: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    email: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    address: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    gender: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const verifiedBodyTemplate = (rowData) => {
    return (
      <Tag
        className={classNames({
          "bg-green-500": rowData.approval,
          "bg-red-500": !rowData.approval,
        })}
        value={rowData.approval ? "Approved" : "Not Approved"}
      />
    );
  };

  const verifiedRowFilterTemplate = (options) => {
    console.log(options);
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };
  const SpNameBodyTemplate = (rowData) => {
    return (
      <span>
        {rowData.firstName} {rowData.lastName}
      </span>
    );
  };
  const columns = [
    {
      field: "firstName",
      header: "Sp Name",
      filterPlaceholder: "Search by Name",
      body: { SpNameBodyTemplate },
      filterField: "firstName",
    },
    {
      field: "email",
      header: "Email",
      filterPlaceholder: "Search by Name",
      filterField: "email",
    },
    {
      field: "address",
      header: "Address",
      filterPlaceholder: "Search by Name",
      filterField: "address",
    },
    {
      field: "gender",
      header: "Gender",
      filterField: "gender",
    },
    {
      field: "approval",
      header: "Approval",
      dataType: "boolean",
      body: { verifiedBodyTemplate },
      filterElement: verifiedRowFilterTemplate,
    },
  ];

  useEffect(() => {
    fetchserviceBooked();
  }, []);

  const fetchserviceBooked = async () => {
    try {
      const spResponse = await getdata("/sp/getAllSp");

      const spData = spResponse.data.data;

      setMDetails(spData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getGenderLabel = (value) => {
    switch (value) {
      case 0:
        return "Others";
      case 1:
        return "Male";
      case 2:
        return "Female";
      default:
        return "Unknown";
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
    var text = "Service Provider Report";
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
        if (col.header == "Gender") {
          return getGenderLabel(row[col.dataKey]);
        } else {
          return row[col.dataKey];
        }
      })
    );

    doc.autoTable(customHeaders, bodyData, tableOptions);

    doc.save("ServiceProviderReport.pdf");
  };

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setVisibleColumns(orderedSelectedColumns);
  };
  const getGenderName = (gender) => {
    switch (gender) {
      case 0:
        return "Other";
      case 1:
        return "Male";
      case 2:
        return "Female";
      default:
        return "";
    }
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
      <h1 className="text-3xl mb-3">Service Provider Report</h1>
      <DataTable
        value={mdetails}
        paginator
        rows={5}
        sortMode="multiple"
        rowsPerPageOptions={5}
        filterDisplay="row"
        emptyMessage="No customers found."
        header={header}
        tableStyle={{ minWidth: "50rem" }}
        id="mytable"
      >
        {visibleColumns.map((col) => (
          <Column
            // Ensure each key is unique based on the field
            field={col.field}
            header={col.header}
            filterPlaceholder={col.filterPlaceholder}
            filter
            sortable
            filterElement={col.filterElement}
            body={
              col.field === "gender"
                ? (rowData) => getGenderName(rowData[col.field])
                : col.header === "Sp Name"
                ? SpNameBodyTemplate
                : col.field === "approval"
                ? verifiedBodyTemplate
                : undefined
            }
          />
        ))}
      </DataTable>
    </>
  );
}

export default ServiceProviderReport;
