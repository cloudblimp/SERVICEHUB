// import "../../../components/AdminSide/datatable/table/Table.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, CardFooter, Button } from "@material-tailwind/react";

const ChatTable = ({ heads, rows, url }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rows.length / 5);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const navigate = useNavigate();

  const openNewPage = () => {
    navigate(`${url}`);
    // console.log({ url });
  };
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {heads.map((head) => (
              <th
                key={head}
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
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map(
            ({ chatid, serviceprovidername, username, chatdate }, rowIndex) => (
              <tr key={rowIndex}>
                <td
                  className={`p-4 ${
                    rowIndex === rows.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {chatid}
                  </Typography>
                </td>
                <td
                  className={`p-4 ${
                    rowIndex === rows.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {serviceprovidername}
                  </Typography>
                </td>
                <td
                  className={`p-4 ${
                    rowIndex === rows.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {username}
                  </Typography>
                </td>
                <td
                  className={`p-4 ${
                    rowIndex === rows.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {chatdate}
                  </Typography>
                </td>
                <td className="">
                  <Button
                    className="bg-[#1A3570] text-white"
                    onClick={() => openNewPage(`${url}/${chatid}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            )
          )}
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
    </Card>
  );
};
export default ChatTable;
