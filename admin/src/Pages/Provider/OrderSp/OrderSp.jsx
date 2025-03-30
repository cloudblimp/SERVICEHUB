import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import Widget from "../../../components/Dashboard/Widget";
import OrderTable from "./OrderTable";
import { useState, useEffect } from "react";
import { getdata } from "../../../services/Apis";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";

const OrderSP = () => {
  const [services, setServices] = useState([]);
  const [len, setlen] = useState("");
  const [cancelledlen, setcancelledlen] = useState("");
  const [tickClick, setTickClick] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const count = services.filter(
      (service) => service.order_status == 2
    ).length;
    setcancelledlen(count);
  }, [services]);

  const fetchData = async () => {
    const spid = localStorage.getItem("userID");
    try {
      const response = await getdata(`/serviceReq/getOrdersBySPID/${spid}`);
      setServices(response.data.data);

      setlen(response.data.data.length);
      handleRefundProcess(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRefundProcess = async (data) => {
    for (const serv of data) {
      if (calculateTimeColor(serv.orderTime) === "red") {
        await handleCancelButtonClick(serv._id);
        const pid = await fetchPaymentId(serv._id);
        if (pid) {
          const refundData = {
            payment_id: pid,
            refund_amount: serv.price,
            service_id: serv._id,
            refund_status: 1,
          };
          await addRefund(refundData);
          await handleStatus(serv._id);
        }
      }
    }
  };

  const addRefund = async (refundData) => {
    try {
      const response = await axios.post(
        `http://localhost:1000/refund/addRefund`,
        refundData
      );
      console.log("Refund added successfully:", response.data);
    } catch (error) {
      console.error("Error adding refund:", error);
    }
  };

  const handleStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/serviceReq/updateOrderStatus/${id}/${2}`
      );
      const response2 = await axios.put(
        `http://localhost:1000/serviceReq/updateStatus/${id}/${2}`
      );
      console.log("Response for status cancelled", response.data.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const formatOrderTime = (dateTimeString) => {
    const orderTime = new Date(dateTimeString);
    const ISTTime = orderTime.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    return ISTTime;
  };

  const calculateTimeColor = (dateTimeString) => {
    if (tickClick) {
      console.log("jhbjuujjjjjjjj", tickClick);
      return "green";
    } else {
      const orderTime = new Date(dateTimeString);
      const currentTime = new Date();
      const differenceInSeconds = (currentTime - orderTime) / 1000;
      return differenceInSeconds > 3600 ? "red" : "green";
    }
  };

  const handleTickButtonClick = async (id) => {
    try {
      const resp = await axios.put(
        `http://localhost:1000/serviceReq/updateBookingStatus/${id}/${1}`
      );
      alert("Booking confirmed");
      setTickClick(true);
      console.log("Response, bookingStatus updated", resp);
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleCancelButtonClick = async (id) => {
    try {
      const resp = await axios.put(
        `http://localhost:1000/serviceReq/updateBookingStatus/${id}/${2}`
      );
      console.log("Response, bookingStatus updated", resp);
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const resp = await axios.put(
        `http://localhost:1000/serviceReq/updateBookingStatus/${id}/${2}`
      );
      alert("Booking cancelled");
      console.log("Response, bookingStatus updated", resp);
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const fetchPaymentId = async (requestId) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/getPaymentID/${requestId}`
      );
      if (response.status === 200) {
        return response.data.data._id;
      }
    } catch (error) {
      console.error("Error fetching payment ID:", error);
    }
  };

  return (
    <div className="provider">
      <Sidebar />
      <div className="providercontainer bg-slate-50">
        <div className="widgets">
          <Widget type="Torders" datas={len} />
          <Widget type="Porders" datas={cancelledlen} />
          <Widget type="Corders" datas={len - cancelledlen} />
        </div>
        <div className="flex flex-wrap m-2 gap-4">
          {services.map(
            (serv) =>
              (serv.booking_status === 0 || serv.booking_status === 1) && (
                <div key={serv._id}>
                  <Card className="w-96 m-4">
                    {!tickClick && (
                      <CardHeader className="bg-blue-100 h-10 flex items-center px-2">
                        <div className=" flex items-center justify-between">
                          <Typography color="blue-gray" className="font-medium">
                            Order Time :
                          </Typography>
                          <Typography
                            color={calculateTimeColor(serv.orderTime)}
                            className="font-medium"
                          >
                            {formatOrderTime(serv.orderTime)}
                          </Typography>
                        </div>
                      </CardHeader>
                    )}

                    <CardBody>
                      <div className="mb-1 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                          {serv.service_id.mini_cat_id.mini_cat_name}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium">
                          {serv.price && serv.price}Rs
                        </Typography>
                      </div>
                      <div className="mb-1 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                          {serv.available_date}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium">
                          {serv.available_time}
                        </Typography>
                      </div>
                      <div className="mb-1">
                        <span className="flex items-center justify-between">
                          <Typography color="blue-gray" className="font-medium">
                            {serv.customer}
                          </Typography>
                          <Typography
                            color="blue-gray"
                            className="font-semibold text-sm"
                          >
                            {serv.phoneNo}
                          </Typography>
                        </span>
                        <Typography color="gray" className="font-small text-sm">
                          {serv.address}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-between gap-4">
                      {calculateTimeColor(serv.orderTime) === "green" &&
                        !tickClick && (
                          <>
                            <Button
                              onClick={() => handleTickButtonClick(serv._id)}
                              ripple={false}
                              fullWidth={true}
                              className="bg-green-600 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                              Tick
                            </Button>
                            <Button
                              onClick={() => handleCancelButtonClick(serv._id)}
                              ripple={false}
                              fullWidth={true}
                              className="bg-red-600 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      {calculateTimeColor(serv.orderTime) === "red" && (
                        <Button disabled className="w-full">
                          Booking cancelled
                        </Button>
                      )}
                      {tickClick && (
                        <Button
                          onClick={() => handleCancel(serv._id)}
                          ripple={false}
                          fullWidth={true}
                          className="bg-red-600 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        >
                          Cancel
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              )
          )}
        </div>

        <div className="listcontainer">
          <div className="listTitle">Service Provider Details</div>
          <OrderTable rows={services} />
        </div>
      </div>
    </div>
  );
};

export default OrderSP;
