import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFunction, getdata } from "../../services/Apis";
import axios from "axios";
import { Input, Textarea } from "@material-tailwind/react";

const Order = () => {
  const [sp, setsp] = useState("");
  const [spdetails, setspdetails] = useState("");
  const [minicat, setminicat] = useState([]);
  const [user, setuser] = useState([]);
  const [names, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ServiceReq, setServiceReq] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getdata(`/service/getService/${serviceID}`);
      setminicat(response.data.data[0]);
      setspdetails(
        response.data.data[0].sp_id.firstName +
          response.data.data[0].sp_id.lastName
      );
      setsp(response.data.data[0].sp_id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (ServiceReq) {
          const response1 = await axios.get("http://localhost:1000/api/getkey");
          const key = response1.data.key;
          const response2 = await axios.post(
            "http://www.localhost:1000/api/checkout",
            {
              amount: price,
            }
          );
          const order = response2.data.order;
          const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: names,
            description: "Tutorial of RazorPay",
            image: "https://avatars.githubusercontent.com/u/25058652?v=4",
            order_id: order.id,
            callback_url: `http://localhost:1000/api/paymentverification/${ServiceReq}/${price}`,
            prefill: {
              name: names,
              email: "gaurav.kumar@example.com",
              contact: "9999999999",
            },
            notes: {
              address: address,
            },
            theme: {
              color: "#121212",
            },
          };
          new window.Razorpay(options).open();
        }
      } catch (error) {
        console.log("error:: ", error);
      }
    };

    fetchPaymentDetails();
  }, [ServiceReq]); // Only run when ServiceReq changes

  const serviceID = localStorage.getItem("serviceID");
  const userID = localStorage.getItem("userID");
  const servicename = localStorage.getItem("MinicatName");
  const date = localStorage.getItem("Date");
  const D = date.slice(0, 15);
  const time = localStorage.getItem("Time");
  const price = localStorage.getItem("Price");

  const checkoutHandler = async (amount) => {
    try {
      const orderDetails = {
        service_id: serviceID,
        user_id: userID,
        customer: names,
        phoneNo: phone,
        address: address,
        available_date: D,
        available_time: time,
        price: price,
        booking_status: 0,
        payment_status: 0,
      };
      const resp = await addFunction(orderDetails, "/serviceReq/addServiceReq");
      console.log("OrderDetauls:", resp);
      setServiceReq(resp.data.data._id);
    } catch (error) {
      console.log("Error generating OrderDetails:", error);
    }
  };
  return (
    <div className="bg-[#1A3570] w-screen h-screen flex items-center justify-center">
      <div className="max-w-[70%] mx-auto  p-8 shadow-xl bg-white">
        <h2 className="text-3xl font-bold mb-4 text-blue-900">Order Summary</h2>
        <div className="flex items-center gap-10 ">
          <div className=" w-[100%] pr-10">
            <h1 className="text-blue-900 text-2xl font-base mb-9">
              Service Delivery Details
            </h1>
            <div className="mb-4">
              <Input
                label="Name"
                placeholder="Your name"
                fullWidth
                value={names}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Phone No"
                fullWidth
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="mb-4">
              <Textarea
                label="Address"
                fullWidth
                value={address}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div className="bg-gray-100 px-10 py-7 mr-0 w-[50rem] shadow-xl">
            <h1 className="text-blue-900 text-3xl font-base mb-4">
              Order Details
            </h1>
            <div className="mt-5">
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500">Service:</span>
                <span>{servicename}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500">Service Provider:</span>
                <span>{spdetails}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500">Date:</span>
                <span>{D}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500">Time:</span>
                <span>{time}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500">Price:</span>
                <span>Rs.{price}</span>
              </div>
              <button
                className="bg-[#FCA311] px-4 py-2 mt-4 text-white rounded-md w-[100%]"
                onClick={() => checkoutHandler(price)}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
