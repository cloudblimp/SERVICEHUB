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
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpEdit = ({ data }) => {
  const { Eopen, setEOpen } = useNewData();
  const [price, setprice] = useState(data.price);
  const [time, settime] = useState(data.service_time);
  useEffect(() => {}, [data]);
  const handleClose = () => setEOpen(false);

  const handleCreate = async () => {
    const adminCommission = 0.02;
    const spEarning = price * (1 - adminCommission);

    const editService = async (data) => {
      const formData = new FormData();
      formData.append("sp_id", data.sp_id);
      formData.append("yoe", data.yoe);
      formData.append("price", price);
      formData.append("admin_commission", data.admin_commission);
      formData.append("sp_earning", spEarning);
      formData.append("service_time", time);
      formData.append("created_at", data.created_at);
      formData.append("mini_cat_id", data.mini_cat_id._id);
      formData.append("updated_at", new Date().toISOString().split("T")[0]);

      try {
        const data1 = await axios.put(
          `http://localhost:1000/service/updateServiceById/${data._id}`,
          formData
        );
        console.log(data1);
        toast.success("Service updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close the notification after 3 seconds
          hideProgressBar: false, // Display the progress bar
          closeOnClick: true, // Close the notification on click
          pauseOnHover: true, // Pause the auto-close timer on hover
          draggable: true, // Allow the notification to be dragged
          progress: undefined, // Display the default progress bar
        });
      } catch (error) {
        console.log(error);
      }
    };
    await editService(data);

    handleClose();
  };

  const handlePrice = (e) => {
    const value = e.target.value;
    setprice(value);
  };
  const handletime = (e) => {
    settime(e.target.value);
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
                label="Mini Category name"
                value={data.mini_cat_id.mini_cat_name}
                disabled
              />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="text"
                label="Max Price"
                value={data.mini_cat_id.max_price}
                disabled
              />
            </span>
            <span>
              <Input
                type="text"
                label="Minimum Price"
                value={data.mini_cat_id.min_price}
                disabled
              />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="number"
                label="Price"
                onChange={handlePrice}
                value={price}
              />
            </span>
            <span>
              <Input
                type="text"
                label="Admin Commission"
                value={data.admin_commission}
                disabled
              />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="number"
                label="Service Time"
                onChange={handletime}
                value={time}
              />
            </span>
            <span>
              <Input
                type="number"
                label="Year OF Experience"
                value={data.yoe}
                disabled
              />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="date"
                label="Created At"
                value={data.created_at}
                disabled
              />
            </span>

            <span>
              <Input
                type="date"
                label="Updated At"
                value={new Date().toISOString().split("T")[0]}
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

export default SpEdit;
