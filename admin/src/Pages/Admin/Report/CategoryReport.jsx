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
function CategoryReport() {
  const [mdetails, setMDetails] = useState([]);

  const [filters, setFilters] = useState({
    tag: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    mini_cat_name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    min_price: {
      value: null,
      matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
    },
    max_price: {
      value: null,
      matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
    },
    "nested_cat_id.nest_category_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "nested_cat_id.sub_cat_id.sub_category_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "nested_cat_id.sub_cat_id.s_id.service_name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
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
      field: "tag",
      header: "Tag",
      filterPlaceholder: "Search",
    },
    {
      field: "mini_cat_name",
      header: "Mini Category Name",
      filterPlaceholder: "Search",
      filterField: "mini_cat_name",
    },
    {
      field: "min_price",
      header: "Min Price (Rs)",
      filterPlaceholder: "Search",
    },
    {
      field: "max_price",
      header: "Max Price (Rs)",
      filterPlaceholder: "Search",
    },
    {
      field: "mini_cat_image",
      header: "image",
      filterPlaceholder: "Search",
      body: { imageBodyTemplate },
    },
    {
      field: "nested_cat_id.nest_category_name",
      header: "Nested Category name",
      filterPlaceholder: "Search",
    },
    {
      field: "nested_cat_id.sub_cat_id.sub_category_name",
      header: "Sub category name",
      filterPlaceholder: "Search",
    },
    {
      field: "nested_cat_id.sub_cat_id.s_id.service_name",
      header: "Category name",
      filterPlaceholder: "Search",
    },
  ];

  useEffect(() => {
    fetchminicatData();
  }, []);

  const fetchminicatData = async () => {
    try {
      const response = await getdata("/minicat/getAllMiniCat");
      setMDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const exportPdf = () => {
    const exportColumns = visibleColumns
      .filter((col) => col.header !== "image") // Exclude the image column
      .map((col) => ({
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
    var text = "Category Report";
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
        if (col.header === "Nested Category name") {
          return row.nested_cat_id.nest_category_name; // Access nested data
        } else if (col.header === "Sub category name") {
          return row.nested_cat_id.sub_cat_id.sub_category_name; // Access nested data
        } else if (col.header === "Category name") {
          return row.nested_cat_id.sub_cat_id.s_id.service_name; // Access nested data
        } else {
          return row[col.dataKey]; // Access non-nested data
        }
      })
    );

    doc.autoTable(customHeaders, bodyData, tableOptions);

    doc.save("CategoryReport.pdf");
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

export default CategoryReport;

// import React, { useState, useEffect } from "react";
// import { classNames } from "primereact/utils";
// import { FilterMatchMode, FilterOperator } from "primereact/api";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { MultiSelect } from "primereact/multiselect";
// import { Tag } from "primereact/tag";
// import { TriStateCheckbox } from "primereact/tristatecheckbox";
// // import { CustomerService } from "./service/CustomerService";

// function CategoryReport() {
//   const [customers, setCustomers] = useState(null);
//   const [filters, setFilters] = useState({
//     name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//     "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//     representative: { value: null, matchMode: FilterMatchMode.IN },
//     status: { value: null, matchMode: FilterMatchMode.EQUALS },
//     verified: { value: null, matchMode: FilterMatchMode.EQUALS },
//   });
//   const [loading, setLoading] = useState(true);

//   const [representatives] = useState([
//     { name: "Amy Elsner", image: "amyelsner.png" },
//     { name: "Anna Fali", image: "annafali.png" },
//     { name: "Asiya Javayant", image: "asiyajavayant.png" },
//     { name: "Bernardo Dominic", image: "bernardodominic.png" },
//     { name: "Elwin Sharvill", image: "elwinsharvill.png" },
//     { name: "Ioni Bowcher", image: "ionibowcher.png" },
//     { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
//     { name: "Onyama Limba", image: "onyamalimba.png" },
//     { name: "Stephen Shaw", image: "stephenshaw.png" },
//     { name: "XuXue Feng", image: "xuxuefeng.png" },
//   ]);
//   const [statuses] = useState([
//     "unqualified",
//     "qualified",
//     "new",
//     "negotiation",
//     "renewal",
//   ]);

//   const getSeverity = (status) => {
//     switch (status) {
//       case "unqualified":
//         return "danger";

//       case "qualified":
//         return "success";

//       case "new":
//         return "info";

//       case "negotiation":
//         return "warning";

//       case "renewal":
//         return null;
//     }
//   };
//   const CustomerService = [
//     {
//       id: 1000,
//       name: "Aames Butt",
//       country: {
//         name: "Algeria",
//         code: "dz",
//       },
//       company: "Benton, John B Jr",
//       date: "2015-09-13",
//       status: "unqualified",
//       verified: true,
//       activity: 17,
//       representative: {
//         name: "Ioni Bowcher",
//         image: "ionibowcher.png",
//       },
//       balance: 70663,
//     },
//     {
//       id: 1000,
//       name: "James Butt",
//       country: {
//         name: "Algeria",
//         code: "dz",
//       },
//       company: "Benton, John B Jr",
//       date: "2015-09-13",
//       status: "unqualified",
//       verified: true,
//       activity: 17,
//       representative: {
//         name: "Ioni Bowcher",
//         image: "ionibowcher.png",
//       },
//       balance: 70663,
//     },
//   ];
//   useEffect(() => {
//     setCustomers(CustomerService);
//     setLoading(false);
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   const countryBodyTemplate = (rowData) => {
//     return (
//       <div className="flex align-items-center gap-2">
//         <img
//           alt="flag"
//           src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
//           className={`flag flag-${rowData.country.code}`}
//           style={{ width: "24px" }}
//         />
//         <span>{rowData.country.name}</span>
//       </div>
//     );
//   };

//   const representativeBodyTemplate = (rowData) => {
//     const representative = rowData.representative;

//     return (
//       <div className="flex align-items-center gap-2">
//         <img
//           alt={representative.name}
//           src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`}
//           width="32"
//         />
//         <span>{representative.name}</span>
//       </div>
//     );
//   };

//   const representativesItemTemplate = (option) => {
//     return (
//       <div className="flex align-items-center gap-2">
//         <img
//           alt={option.name}
//           src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`}
//           width="32"
//         />
//         <span>{option.name}</span>
//       </div>
//     );
//   };

//   const statusBodyTemplate = (rowData) => {
//     return (
//       <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
//     );
//   };

//   const statusItemTemplate = (option) => {
//     return <Tag value={option} severity={getSeverity(option)} />;
//   };

//   const verifiedBodyTemplate = (rowData) => {
//     return (
//       <i
//         className={classNames("pi", {
//           "true-icon pi-check-circle": rowData.verified,
//           "false-icon pi-times-circle": !rowData.verified,
//         })}
//       ></i>
//     );
//   };

//   const representativeRowFilterTemplate = (options) => {
//     return (
//       <MultiSelect
//         value={options.value}
//         options={representatives}
//         itemTemplate={representativesItemTemplate}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//         optionLabel="name"
//         placeholder="Any"
//         className="p-column-filter"
//         maxSelectedLabels={1}
//         style={{ minWidth: "14rem" }}
//       />
//     );
//   };

//   const statusRowFilterTemplate = (options) => {
//     return (
//       <Dropdown
//         value={options.value}
//         options={statuses}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//         itemTemplate={statusItemTemplate}
//         placeholder="Select One"
//         className="p-column-filter"
//         showClear
//         style={{ minWidth: "12rem" }}
//       />
//     );
//   };

//   const verifiedRowFilterTemplate = (options) => {
//     return (
//       <TriStateCheckbox
//         value={options.value}
//         onChange={(e) => options.filterApplyCallback(e.value)}
//       />
//     );
//   };

//   return (
//     <div className="card">
//       <DataTable
//         value={customers}
//         paginator
//         rows={10}
//         dataKey="id"
//         filters={filters}
//         filterDisplay="row"
//         loading={loading}
//         emptyMessage="No customers found."
//       >
//         <Column
//           field="name"
//           header="Name"
//           filter
//           filterPlaceholder="Search by name"
//           style={{ minWidth: "12rem" }}
//         />
//         <Column
//           header="Country"
//           filterField="country.name"
//           style={{ minWidth: "12rem" }}
//           body={countryBodyTemplate}
//           filter
//           filterPlaceholder="Search by country"
//         />
//         <Column
//           header="Agent"
//           filterField="representative"
//           showFilterMenu={false}
//           filterMenuStyle={{ width: "14rem" }}
//           style={{ minWidth: "14rem" }}
//           body={representativeBodyTemplate}
//           filter
//           filterElement={representativeRowFilterTemplate}
//         />
//         <Column
//           field="status"
//           header="Status"
//           showFilterMenu={false}
//           filterMenuStyle={{ width: "14rem" }}
//           style={{ minWidth: "12rem" }}
//           body={statusBodyTemplate}
//           filter
//           filterElement={statusRowFilterTemplate}
//         />
//         <Column
//           field="verified"
//           header="Verified"
//           dataType="boolean"
//           style={{ minWidth: "6rem" }}
//           body={verifiedBodyTemplate}
//           filter
//           filterElement={verifiedRowFilterTemplate}
//         />
//       </DataTable>
//     </div>
//   );
// }
// export default CategoryReport;
