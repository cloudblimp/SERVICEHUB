import React, { useState, useEffect } from "react";
import { Typography, Button, CardFooter, Chip } from "@material-tailwind/react";
import { getdata } from "../../../services/Apis";
const OrderTable = ({ rows }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rows.length / 5);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const heading = [
    "service_name",
    "user_name",
    "date",
    "time",
    "Amount",
    "booking_status",
    "payment_status",
    "order_status",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead>
          <tr>
            {heading.map((head, index) => (
              <th
                key={index}
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentItems.map((e, index) => {
            const isLast = index === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {e.service_id.mini_cat_id.mini_cat_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {e.user_id.firstName}
                    {""}
                    {e.user_id.lastName}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {e.available_date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {" "}
                    {e.available_time}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {e.price} Rs
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="w-max">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={
                        e.booking_status === 0
                          ? "Pending"
                          : e.booking_status === 1
                          ? "Confirmed"
                          : e.booking_status === 2
                          ? "Cancelled"
                          : "black"
                      }
                      color={
                        e.booking_status === -0
                          ? "yellow"
                          : e.booking_status === 1
                          ? "green"
                          : e.booking_status === 2
                          ? "blue-gray"
                          : "black"
                      }
                    />
                  </div>
                </td>
                <td className={classes}>
                  <div className="w-max text-center">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={
                        e.payment_status === 0
                          ? "Pending"
                          : e.payment_status === 1
                          ? "Paid"
                          : e.payment_status === 2
                          ? "Unpaid"
                          : "black"
                      }
                      color={
                        e.payment_status === 0
                          ? "yellow"
                          : e.payment_status === 1
                          ? "green"
                          : e.payment_status === 2
                          ? "blue-gray"
                          : "black"
                      }
                    />
                  </div>
                </td>
                <td className={classes}>
                  <div className="w-max text-center">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={
                        e.order_status === 0
                          ? "Pending"
                          : e.order_status === 1
                          ? "Confirmed"
                          : e.order_status === 2
                          ? "Cancelled"
                          : "black"
                      }
                      color={
                        e.order_status === 0
                          ? "yellow"
                          : e.order_status === 1
                          ? "green"
                          : e.order_status === 2
                          ? "blue-gray"
                          : "black"
                      }
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    </div>
  );
};
export default OrderTable;
