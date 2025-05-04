import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import {
  PetServiceExclude,
  PetServiceInclude,
} from "../../../Data/Customer/Database";
export function LongDialog({ name }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        color="blue"
        onClick={handleOpen}
        className="hover:bg-[#1A3570]/80 rounded-none"
      >
        View details
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="border-b-2 ">{name}</DialogHeader>
        <DialogBody className="h-[35rem] overflow-scroll">
          <Typography className="font-normal border-b-2">
            <h1 className="font-bold text-lg text-green-700 ">Includes</h1>
            <ul class="list-inside list-disc leading-relaxed my-3">
              {PetServiceInclude.map(({ heading, sub }, index) => {
                return (
                  <li key={index} className=" mb-3">
                    <span className="font-bold text-md text-[#1A3570]">
                      {heading}
                    </span>
                    <p className="text-sm ml-6">{sub}</p>
                  </li>
                );
              })}
            </ul>
          </Typography>
          <Typography className="font-normal border-b-2 mt-4">
            <h1 className="font-bold text-lg text-red-700">Excludes</h1>
            <ul class="list-inside list-disc leading-relaxed my-3">
              {PetServiceExclude.map(({ sub }, index) => {
                return (
                  <li key={index} className="">
                    <span className="font-bold text-md text-[#1A3570]">
                      {sub}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button color="red" onClick={handleOpen}>
            cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
