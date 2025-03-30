import React, { useEffect, useState } from "react";
import Navbar from "../../components/Customer/Navbar/Navbar";
import ChatBox from "./Chat";
import { getdata } from "../../services/Apis";
import axios from "axios";
import ReviewGive from "./ReviewGive";
import { Chip } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
export const BookingDetails = () => {
  const { setIsLoggedIn } = useAuth();
  setIsLoggedIn(true);
  const [orders, setOrders] = useState([]); // State to hold the fetched orders
  const userId = localStorage.getItem("userID");
  const price = localStorage.getItem("Price");

  const razorpayOrderId = useParams("id");
  const order_id = razorpayOrderId.id;
  useEffect(() => {
    // Check if razorpayOrderId.id is available before calling paymentStatus
    if (order_id) {
      paymentStatus();
    }
  }, [order_id]);

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const paymentStatus = async () => {
    try {
      const paymentResp = axios.get(
        `http://localhost:1000/api/checkOrderID/${order_id}`
      );
      console.log("Payment Status", paymentResp);
    } catch (error) {
      console.log("payment Status error", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await getdata(`/serviceReq/getServiceAgg/${userId}`);

      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    const updateOrderStatus = async () => {
      for (const order of orders) {
        if (
          new Date(order.available_date) < new Date() &&
          order.booking_status == 1 &&
          order.payment_status == 1
        ) {
          handleConfirm(order._id);
        }
      }
    };

    updateOrderStatus();
  }, [orders]);

  const handleConfirm = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 1);
      console.log("Order status updated successfully.");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    const resp = await axios.put(
      `http://localhost:1000/serviceReq/updateOrderStatus/${orderId}/${status}`
    );
    console.log("respo orderStatus", resp);
  };

  return (
    <div className="overflow-h-auto w-screen">
      <Navbar />
      <div className="w-screen h-screen bg-gray-200 py-5 px-10">
        <h1 className="text-4xl mb-6">My Orders</h1>
        <div className="shadow-lg bg-[#1A3570] p-3 flex flex-wrap">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white py-4 px-7 m-3 rounded-md shadow-lg w-[40%]"
            >
              <span className="flex justify-between text-xl font-medium text-[#1A3570] mb-2">
                <h1>{order.service_id.mini_cat_id.mini_cat_name}</h1>
                <h1>Rs.{order.price}</h1>
              </span>
              <hr className="border-gray-500" />
              <span className="flex justify-between pt-2">
                <section>
                  <p className="text-sm text-gray-500">Provider</p>
                  <h4 className="text-[#1A3570]">
                    {order.service_id.sp_id.firstName}
                  </h4>
                </section>
                <section className="text-right">
                  <p className="text-sm text-gray-500">Date n Time</p>
                  <h4 className="text-[#1A3570]">
                    {order.available_date} | {order.available_time}
                  </h4>
                </section>
              </span>
              <span className="flex gap-4 items-center">
                {order.order_status == 1 ? (
                  <span className="flex gap-4 items-end justify-center">
                    <ReviewGive disabled={true} order={order} />
                    <Chip
                      color="green"
                      variant="filled"
                      size="sm"
                      value="Completed"
                    ></Chip>
                  </span>
                ) : order.order_status == 2 ? (
                  <span className="flex gap-4 items-end justify-center mt-3">
                    <Chip
                      color="purple"
                      variant="filled"
                      size="sm"
                      value="Refund Generated"
                    ></Chip>
                    <Chip
                      color="red"
                      variant="filled"
                      size="sm"
                      value="Cancelled"
                    ></Chip>
                  </span>
                ) : (
                  <ChatBox disabled={true} order={order} />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
