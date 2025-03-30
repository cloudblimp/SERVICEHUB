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
function ChatReport() {
  const [mdetails, setMDetails] = useState([]);

  const [filters, setFilters] = useState({
    Sender_id: { value: null, matchMode: FilterMatchMode.EQUALS },
    receiver_id: {
      value: null,
      matchMode: FilterMatchMode.EQUALS,
    },
  });

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={product.mini_cat_image}
        alt=""
        className="w-20 p-0 shadow-2 border-round"
      />
    );
  };

  const columns = [
    {
      field: "Sender_id",
      header: "Sender Id",
      filterPlaceholder: "Search",
      filterField: "Sender_id",
    },
    {
      field: "receiver_id",
      header: "Reciever id",
      filterPlaceholder: "Search",
      filterField: "receiver_id",
    },
    {
      field: "chat",
      header: "Chats",
    },
    {
      field: "datetime",
      header: "Date",
      filterPlaceholder: "Search",
    },
  ];

  useEffect(() => {
    fetchmessageData();
  }, []);

  const fetchmessageData = async () => {
    try {
      const response = await getdata("/message/getAllMessage");
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
    var text = "Chat Report";
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
        if (col.header === "nest") {
          return row.nested_cat_id.nest_category_name; // Access nested data
        } else if (col.header === "sub cat name") {
          return row.nested_cat_id.sub_cat_id.sub_category_name; // Access nested data
        } else if (col.header === "category name") {
          return row.nested_cat_id.sub_cat_id.s_id.service_name; // Access nested data
        } else {
          return row[col.dataKey]; // Access non-nested data
        }
      })
    );

    doc.autoTable(customHeaders, bodyData, tableOptions);

    doc.save("products.pdf");
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
        className="w-full"
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
  console.log("chatsss:", mdetails);
  return (
    <>
      <h1 className="text-3xl mb-3">Category Table</h1>
      <div>
        <DataTable
          value={mdetails}
          paginator
          rows={5}
          filterDisplay="row"
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
              filter={col.field != "mini_cat_image" ? true : false}
              filterField={
                col.field != "mini_cat_image" ? col.filterField : undefined
              }
              body={
                col.field === "mini_cat_image" ? imageBodyTemplate : undefined
              }
            />
          ))}
        </DataTable>
      </div>
    </>
  );
}

export default ChatReport;
