import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

const Edittable = ({ heads, rows, onRowTransfer }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rows.length / 5);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="datatable">
      <Card className="h-full w-full">
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {Array.isArray(heads) &&
                  heads.map(
                    (head, index) =>
                      head !== "approval" &&
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

                <th className="bg-blue-gray-50 border-b border-blue-gray-100"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, rowIndex) => {
                // Filter out rows where approval is false
                if (!row.approval) {
                  return (
                    <tr key={rowIndex}>
                      {heads.map((head, colIndex) => {
                        // Skip rendering the approval column
                        if (head !== "approval" && head !== "_id") {
                          return (
                            <td
                              key={colIndex}
                              className={`p-4 ${
                                rowIndex === currentItems.length - 1
                                  ? ""
                                  : "border-b border-blue-gray-50"
                              } `}
                            >
                              {head.toLowerCase() === "photo" ? (
                                <Avatar src={row.photo} alt="" size="sm" />
                              ) : head.toLowerCase() === "gender" ? (
                                <Typography variant="small">
                                  {row[head.toLowerCase()] === 1
                                    ? "Male"
                                    : row[head.toLowerCase()] === 2
                                    ? "Female"
                                    : "Other"}
                                </Typography>
                              ) : head.toLowerCase() === "doj" ? (
                                <Typography>
                                  {row[head].slice(0, row[head].indexOf("T"))}
                                </Typography>
                              ) : (
                                <Typography variant="small">
                                  {row[head]}
                                </Typography>
                              )}
                            </td>
                          );
                        } else {
                          return null; // Skip rendering the approval and _id columns
                        }
                      })}

                      <td>
                        <Tooltip content="Approve Provider">
                          <IconButton
                            color="green"
                            onClick={() => onRowTransfer(row)}
                            className="ml-10"
                          >
                            <i className="fa-solid fa-check"></i>
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Disapprove Provider">
                          <IconButton
                            color="red"
                            onClick={() => onRowTransfer(row._id, row.approval)}
                            className="mx-2"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                } else {
                  return null; // Skip rendering rows where approval is true
                }
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography color="gray" className="font-normal">
            Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
            <strong className="text-gray-900">{totalPages}</strong>
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Edittable;
