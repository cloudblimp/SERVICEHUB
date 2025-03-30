import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  Rating,
} from "@material-tailwind/react";
import { addFunction } from "../../services/Apis";
const ReviewGive = ({ order, disabled }) => {
  const [open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const [rate, setrate] = useState(0);

  const handleOpen = () => {
    console.log(disabled);
    if (disabled == "false") {
      setOpen(open);
      alert("This Option will be available after the order has been completed");
    } else {
      setOpen(!open);
    }
  };
  const handlesubmit = async () => {
    const feedbackData = {
      user_id: order.user_id._id,
      message: msg,
      rating: rate,
      service_id: order.service_id._id,
    };
    try {
      const response = await addFunction(feedbackData, "/feedback/addFeedback");
      console.log("feedback inseerted", response.data.data);

      alert("feedback inserted");
      setOpen(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        className={`p-1.5 mt-2.5 px-3 text-white rounded-md font-normal ${
          order.order_status == 1 ? "bg-[#1A3570]" : "bg-gray-400"
        }`}
      >
        Feedback
      </Button>

      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1 text-[#FCA311]" variant="h4">
              Feedback
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Write the message and then click button.
          </Typography>
          <div className="grid gap-6">
            <Input label="Username" value={order.user_id.firstName} />
            <Textarea
              label="Message"
              value={msg}
              onChange={(e) => setmsg(e.target.value)}
            />
            <Rating value={rate} onChange={(value) => setrate(value)} />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button className="bg-[#FCA311]" onClick={handlesubmit}>
            send message
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default ReviewGive;
