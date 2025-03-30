import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
const Payment = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#1A3570] w-screen h-screen flex items-center justify-center">
        <div className="max-w-[70%] mx-auto p-8 shadow-xl bg-white flex flex-col items-center justify-center rounded-md ">
          <i
            className="fas fa-check-circle fa-beat"
            style={{ color: "#2acb34", fontSize: "2rem", marginBottom: "1rem" }}
          ></i>
          <h1 className="text-3xl mt-2 text-[#1A3570] font-semibold">
            Order Confirmed
          </h1>
          <p className="text-center text-md text-gray-500 leading-6 mt-3 tracking-wider ">
            Your order is confirmed. Thank you for your payment.
            <br />
            The order details can be seen in My Orders
          </p>

          <NavLink to="/bookingdetails">
            <Button className="px-4 py-2 text-white shadow-md bg-[#FCA311] mt-5 rounded-md">
              My Orders
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Payment;
