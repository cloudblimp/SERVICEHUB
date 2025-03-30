import { Button, Dialog, Rating, Typography } from "@material-tailwind/react";
import React from "react";
import { Review } from "../../../Data/Customer/Database";

const Pop = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(!open);
  return (
    <>
      <Button
        size="sm"
        className="m-2 bg-[#FCA311] rounded-none"
        onClick={handleOpen}
      >
        Reviews
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <section className="flex flex-col items-center justify-center w-full h-full p-10">
            <div class="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white mb-2">
              LOGO
            </div>
            <Typography variant="h6" color="blue-gray">
              Serena William
            </Typography>
            <Typography variant="h6" color="blue" className="my-2">
              $499
            </Typography>
            <button
              type="button"
              className="relative m-2 px-3 py-1 text-red-700 bg-red-100 rounded-lg hover:text-white hover:bg-red-500"
              onClick={handleClose}
            >
              Close
            </button>
          </section>

          <div class="bg-white max-w-sm rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl  max-h-[80vh] overflow-y-auto">
            {Review.map((e) => (
              <div className="mb-[15%] " key={e.name}>
                <h1 className="text-lg text-gray-700 font-semibold flex items-center justify-between">
                  {e.name}
                  <Rating value={e.rate} readonly className="ml-10" />
                </h1>
                <p className="mt-2 text-md text-gray-600">{e.review}</p>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default Pop;
