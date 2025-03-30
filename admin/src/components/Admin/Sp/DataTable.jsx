// import "./Datatable.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";

const Datatable = ({ heads, rows, url }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rows.length / 5);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const navigate = useNavigate();

  const openNewPage = (id) => {
    localStorage.setItem("userID", id);
    navigate(`${url}`);
  };

  return (
    <div className="datatable">
      <Card className="h-full w-full">
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {Array.isArray(heads) && // Check if heads is an array
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
              {currentItems.map(
                (row, rowIndex) =>
                  row.approval && (
                    <tr key={rowIndex}>
                      {heads.map(
                        (head, colIndex) =>
                          head !== "approval" &&
                          head !== "_id" && (
                            <td
                              key={colIndex}
                              className={`p-4 ${
                                rowIndex === currentItems.length - 1
                                  ? ""
                                  : "border-b border-blue-gray-50"
                              } `}
                            >
                              {head.toLowerCase() === "gender" ? (
                                <Typography variant="small">
                                  {row[head.toLowerCase()] === 1
                                    ? "Male"
                                    : row[head.toLowerCase()] === 2
                                    ? "Female"
                                    : "Other"}
                                </Typography>
                              ) : head.toLowerCase() === "photo" ? (
                                <Avatar src={row.photo} alt="" size="sm" />
                              ) : head.toLowerCase() === "doj" ? (
                                <Typography>
                                  {row[head].slice(0, row[head].indexOf("T"))}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="small"
                                  className={
                                    row[head.toLowerCase()] === "Approved"
                                      ? "text-green-800 bg-green-100 w-[80px] p-1 rounded-xl text-center"
                                      : row[head.toLowerCase()] === "Pending"
                                      ? "text-blue-gray-800 bg-blue-gray-50 w-[80px] p-1 rounded-xl text-center"
                                      : ""
                                  }
                                >
                                  {row[head]}
                                </Typography>
                              )}
                            </td>
                          )
                      )}
                      <td>
                        <Button
                          color="indigo"
                          onClick={() => openNewPage(row._id)}
                          className="mx-10"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  )
              )}
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
export default Datatable;
