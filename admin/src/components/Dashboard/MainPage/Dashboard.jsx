import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { getcustomerinfo } from "../../../services/Apis";
import Widget from "../Widget";
import FeaturedChart from "../featuredChart/FeaturedChart";
import Chart from "../ChartAdmin";
import "./Dashboard.css";
import { useAuth } from "../../../Context/AuthContext";
import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import ProvidingTable from "../../../Pages/Provider/services/ProvidingTable";
export const Dashboard = () => {
  const { user } = useAuth();
  const [len, setLen] = useState();
  const [len2, setLen2] = useState();
  const [data, setdata] = useState("");
  const loggedIn = localStorage.getItem("Loggedin");
  const spID = localStorage.getItem("userID");
  useEffect(() => {
    fetchData();
  }, []);
  console.log(loggedIn);
  const fetchData = async () => {
    try {
      const response = await getcustomerinfo();
      const response1 = await axios.get(
        "http://localhost:1000/service/getAllService"
      );
      const response2 = await axios.get(
        "http://localhost:1000/serviceReq/getAllServiceReq"
      );
      setLen2(response2.data.data.length);
      setLen(response.data.data.length);
      const totalEarnings = response2.data.data.reduce((total, serviceReq) => {
        const price = serviceReq.service_id.price;
        const spPrice = serviceReq.service_id.sp_earning;
        return total + (price - spPrice);
      }, 0);
      setdata(totalEarnings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="container">
        {loggedIn === "admin" && (
          <div className="widgets">
            <Widget type="user" datas={len} />
            <Widget type="Torders" datas={len2} />
            <Widget type="earning" datas={data.toString().slice(0, 4)} />
            {/* <Widget type="balance" /> */}
          </div>
        )}
        <div className="flex gap-10 mx-5 ">
          {/* <FeaturedChart /> */}
          {/* <Chart aspect={2 / 1} title="Last 6 Months (Revenue)" /> */}

          <Chart />
        </div>
        {/* {loggedIn === "serviceprovider" && (
          <div className="listcontainer">
            <div className="listTitle">Latest Transaction</div>
            <ProvidingTable />
          </div>
        )} */}
      </div>
    </div>
  );
};
