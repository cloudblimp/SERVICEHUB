import {
  Card,
  CardFooter,
  Typography,
  Button,
  Dialog,
  CardBody,
} from "@material-tailwind/react";
import { useNewData } from "../../../Context/NewDataContext";
import OfferEdit from "./OfferEdit";
import { useState } from "react";
const Offertable = ({ heading, details }) => {
  const [open, setOpen] = useState(false);
  const [offer, setoffer] = useState();

  const { setEOpen, Eopen } = useNewData();

  const handleClose = () => setEOpen(false);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = Array.isArray(details)
    ? details.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(details.length / 5);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEdit = (id) => {
    setoffer(id);

    setEOpen(true);
  };

  return (
    <>
      <Card className="h-full  overflow-scroll rounded-none">
        <table className="w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {Array.isArray(heading) &&
                heading.map(
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
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {heading.map(
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
                        {head === "start_date" ? (
                          <Typography variant="small">
                            {row[head].slice(0, row[head].indexOf("T"))}
                          </Typography>
                        ) : (
                          <Typography variant="small">{row[head]}</Typography>
                        )}
                      </td>
                    )
                )}
                <td>
                  <Button
                    color="blue"
                    className="font-medium bg-blue-500 p-2 text-center rounded-md mx-2"
                    onClick={() => handleEdit(row)}
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
      <Dialog
        size="lg"
        open={Eopen}
        onClose={handleClose}
        className="bg-transparent shadow-none"
      >
        <i
          className="fa-solid fa-xmark fa-xl absolute top-8 right-[16rem] z-20 text-red-500"
          onClick={handleClose}
        />
        <OfferEdit data={offer} />
      </Dialog>
    </>
  );
};
export default Offertable;
