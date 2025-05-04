import { Card, Typography, Button, Dialog } from "@material-tailwind/react";
import EditService from "./EditService";
import { useState } from "react";
import EditSubCategory from "./EditSubCategory";
import EditNestedCategory from "./EditNestedCategory";

const Servicetable = ({ TABLE_HEAD, TABLE_ROWS, flag, categoryNames }) => {
  const [open, setOpen] = useState(false);
  const [serviceID, setserviceID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = TABLE_ROWS.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(TABLE_ROWS.length / itemsPerPage);

  const handleClose = () => setOpen(false);

  const handleEdit = (id) => {
    console.log("edit id", id);
    setserviceID(id);
    setOpen(true);
  };
  const getServiceNameById = (serviceId) => {
    const service = categoryNames.find((item) => item._id === serviceId);
    return service ? service.service_name : "Loading...";
  };
  const getNestedServiceNameById = (serviceId) => {
    const service = categoryNames.find((item) => item._id === serviceId);
    return service ? service.sub_category_name : "Loading...";
  };
  const getNestedCategoryById = (serviceId) => {
    const service = categoryNames.find((item) => item._id === serviceId);
    return service ? service.nest_category_name : "Loading...";
  };
  console.log("Table rows", TABLE_ROWS);
  return (
    <>
      <Card className="h-full  overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {Array.isArray(TABLE_HEAD) &&
                TABLE_HEAD.map(
                  (head, index) =>
                    head !== "_id" && (
                      <th
                        key={index}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    )
                )}
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-blue-gray-50">
                {Object.keys(row).map((key, colIndex) => {
                  if (key !== "_id" && key !== "__v") {
                    return (
                      <td
                        key={colIndex}
                        className={`p-4 ${
                          rowIndex === currentItems.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        } `}
                      >
                        {key.toLowerCase() === "photo" ? (
                          <img
                            src={row[key]}
                            alt="service-photo"
                            className="w-20 h-20"
                          />
                        ) : key.toLowerCase() === "mini_cat_image" ? (
                          <img
                            src={row[key]}
                            alt="service-photo"
                            className="w-20 h-20"
                          />
                        ) : key.toLowerCase() === "s_id" ? (
                          <Typography variant="small">
                            {getServiceNameById(row[key])}
                          </Typography>
                        ) : key.toLowerCase() === "sub_cat_id" ? (
                          <Typography variant="small">
                            {getNestedServiceNameById(row[key])}
                          </Typography>
                        ) : key.toLowerCase() === "nested_cat_id" ? (
                          <Typography variant="small">
                            {row[key].nest_category_name}
                          </Typography>
                        ) : (
                          <Typography variant="small">{row[key]}</Typography>
                        )}
                      </td>
                    );
                  }
                })}
                <td>
                  <Button
                    color="blue-gray"
                    className="font-medium bg-blue-500 p-2 text-center rounded-md mx-2"
                    onClick={() => handleEdit(row._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="red"
                    className="font-medium bg-red-500 p-2 text-center rounded-md mx-2"
                  >
                    Deactivate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Dialog
        size="lg"
        open={open}
        onClose={() => handleClose()}
        className="bg-transparent shadow-none"
      >
        <i
          className="fa-solid fa-xmark fa-xl absolute top-8 right-[3rem] z-20 text-red-500"
          onClick={handleClose}
        />
        {flag === "serviceCat" ? (
          <EditService data={serviceID} />
        ) : flag === "NestedSubServiceCat" ? (
          <EditNestedCategory data={serviceID} />
        ) : (
          <EditSubCategory props={serviceID} />
        )}
      </Dialog>
      <div className="flex justify-center mt-4">
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Servicetable;
