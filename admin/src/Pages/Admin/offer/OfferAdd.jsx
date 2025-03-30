// OfferAdd.js
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Alert,
} from "@material-tailwind/react";

import { addFunction } from "../../../services/Apis";
const OfferAdd = () => {
  const [offername, setoffername] = useState("");
  const [desc, setdesc] = useState("");
  const [discount, setdiscount] = useState("");
  const [sdate, setSdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [discountError, setDiscountError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleCreate = async () => {
    if (!validateDiscount() || !validateDates()) {
      return;
    }
    console.log("sdates", sdate, enddate);
    const newDataItem = {
      title: offername,
      description: desc,
      start_date: sdate,
      end_date: enddate,
      discount: discount,
      Created_at: new Date().toISOString().split("T")[0],
      Updated_at: "",
    };

    const response = await addFunction(newDataItem, "/offer/addOffer");
    if (response) {
      setSuccessAlert(true);
    } else {
      console.log("error adding offer");
    }
  };

  const validateDiscount = () => {
    const maxDiscount = 80;
    if (parseFloat(discount) > maxDiscount) {
      setDiscountError(`Discount cannot be more than ${maxDiscount}%.`);
      return false;
    }
    setDiscountError("");
    return true;
  };

  const validateDates = () => {
    const startDate = new Date(sdate);
    const endDate = new Date(enddate);
    console.log(enddate);
    if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) {
      setDateError("End Date should be after the Start Date.");
      return false;
    }

    setDateError("");
    return true;
  };

  return (
    <>
      <Card className="mx-auto w-fit relative">
        <CardBody className="flex flex-col gap-4">
          <Typography className="text-[#1A3570] font-bold" variant="h6">
            Add new Offer
          </Typography>
          <div className="flex gap-4">
            <span>
              <Input
                type="text"
                label="Offer name"
                onChange={(e) => setoffername(e.target.value)}
                value={offername}
              />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="textarea"
                label="Description"
                onChange={(e) => setdesc(e.target.value)}
                value={desc}
              />
            </span>
            <span>
              <Input
                type="number"
                label="Discount"
                onChange={(e) => setdiscount(e.target.value)}
                value={discount}
              />
              <div className="text-red-500">{discountError}</div>
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="date"
                label="Start Date"
                onChange={(e) => setSdate(e.target.value)}
                value={sdate}
              />
            </span>
            <span>
              <Input
                type="date"
                label="End Date"
                onChange={(e) => setEnddate(e.target.value)}
                value={enddate}
              />
              <div className="text-red-500">{dateError}</div>
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="date"
                label="Created At"
                value={new Date().toISOString().split("T")[0]}
              />
            </span>

            <span>
              <Input type="date" label="Updated At" disabled />
            </span>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="bg-[#1A3570]" fullWidth onClick={handleCreate}>
            Create
          </Button>
        </CardFooter>
      </Card>
      {successAlert && (
        <Alert type="success" color="green">
          Offer created successfully!
        </Alert>
      )}
    </>
  );
};

export default OfferAdd;
