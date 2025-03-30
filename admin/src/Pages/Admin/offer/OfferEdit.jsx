import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

import { useNewData } from "../../../Context/NewDataContext";
const OfferEdit = (data) => {
  const [title, settitle] = useState("");
  const [description, setdesc] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [discount, setdiscount] = useState("");
  const [created, setcreated] = useState("");
  const [updated, setupdates] = useState("");

  const {
    rowData,
    setRowDataForEdit,
    Data,
    setData,
    setEOpen,
    Eopen,
    OfferData,
    setOfferData,
  } = useNewData();
  console.log("data::", data);

  useEffect(() => {
    settitle(data.data.title);
    setdesc(data.description);
    setstartdate(data.data.start_date);
    setenddate(data.data.end_date);
    setdiscount(data.data.discount);
    setupdates(data.data.Update_at || "");
  }, [data]);
  const handleClose = () => setEOpen(false);

  const handleCreate = () => {
    if (
      !title ||
      !description ||
      !startdate ||
      !enddate ||
      !discount ||
      !created
    ) {
      // Show an alert or handle the validation error as needed
      alert("Please fill in all fields");
      return;
    }

    const newDataItem = {
      title: title,
      description: description,
      startdate: startdate,
      enddate: enddate,
      discount: discount,
      createdat: created,
      updatedat: updated,
    };

    const updatedData = [...OfferData]; // Create a copy of the original data array
    const index = OfferData.findIndex(
      (item) => item.offerid === newDataItem.offerid
    ); // Find the index of the item to be updated
    if (index !== -1) {
      updatedData[index] = newDataItem; // Update the item at the found index
      setOfferData(updatedData); // Update the context data with the modified array
    }

    setRowDataForEdit(newDataItem, index);

    handleClose();
  };

  return (
    <>
      <Card className="mx-auto w-fit relative">
        <CardBody className="flex flex-col gap-4">
          <Typography className="text-[#1A3570] font-bold" variant="h6">
            Add new Service
          </Typography>

          <div className="flex gap-4">
            <span>
              <Input
                type="text"
                label="Title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="textarea"
                label="Description"
                onChange={(e) => setdesc(e.target.value)}
                value={description}
              />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="date"
                label="Start Date"
                onChange={(e) => setstartdate(e.target.value)}
                value={startdate}
              />
            </span>
            <span>
              <Input
                type="date"
                label="End Date"
                onChange={(e) => setenddate(e.target.value)}
                value={enddate}
              />
            </span>
          </div>
          <div className="w-[50%]">
            <Input
              type="number"
              label="Discount"
              onChange={(e) => setdiscount(e.target.value)}
              value={discount}
            />
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="date"
                label="Created At"
                onChange={(e) => setcreated(e.target.value)}
                value={created}
              />
            </span>
            <span>
              <Input
                type="date"
                label="Updated At"
                onChange={(e) => setupdates(e.target.value)}
                value={updated}
              />
            </span>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            className="bg-[#1A3570]"
            fullWidth
            onClick={handleCreate}
            onClose={handleClose}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default OfferEdit;
