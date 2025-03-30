import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import { TABLE_HEAD, TABLE_ROWS } from "../../Data/Serviceprovider/Database";
import Widget from "../../components/Dashboard/Widget";
import Table from "../../components/Provider/tablesss/Table/Table";
import { useState, useEffect } from "react";
import { getdata } from "../../services/Apis";
import OrderTable from "./OrderSp/OrderTable";
const Earnings = () => {
  const [services, setServices] = useState([]);
  const [earnings, setEarnings] = useState("");
  const [balance, setbalance] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const spid = localStorage.getItem("userID");
    try {
      const response = await getdata(`/serviceReq/getOrdersBySPID/${spid}`);
      let count = 0;
      let bal = 0; // Variable to store earnings after deducting 2%
      setServices(response.data.data);
      services.forEach((service) => {
        if (service.order_status === 1) {
          // Deduct 2% from service price
          const priceAfterDeduction = service.price * 0.98; // 2% deduction

          count += service.price; // Original price
          bal += priceAfterDeduction; // Price after deduction
        }
      });
      setEarnings(count);
      setbalance(bal); // Set earnings after deduction
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="listbox">
      <Sidebar />
      <div className="listboxcontainer">
        <div className=" flex gap-10 w-[50%] my-5 mx-6">
          <Widget type="earning" datas={earnings} />
          <Widget type="balance" datas={balance} />
        </div>

        <div className="listcontainer">
          <div className="listTitle">User Details</div>
          {/* <Table heads={TABLE_HEAD} rows={TABLE_ROWS} /> */}
          <OrderTable rows={services} />
        </div>
      </div>
    </div>
  );
};
export default Earnings;
