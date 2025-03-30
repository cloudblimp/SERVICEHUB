import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import { CustomerRows, CustomerHead } from "../../../Data/Admin/Database";
import Widget from "../../../components/Dashboard/Widget";
import Table from "../../../components/Provider/tablesss/Table/Table";
import "./Customer.css";
import { useEffect, useState } from "react";
import { getcustomerinfo } from "../../../services/Apis";
const Customer = () => {
  const [details, setDetails] = useState([]);
  const [heading, setHeading] = useState();
  const [len, setLen] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getcustomerinfo();
      console.log(response);
      const data = response.data.data;
      setLen(response.data.data.length);
      setDetails(response.data.data);
      if (response.data.data.length > 0) {
        const headKeys = Object.keys(data[0]).filter(
          (key) => key !== "accountType" && key !== "__v"
        );
        setHeading(headKeys);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="listbox">
      <Sidebar />
      <div className="listboxcontainer">
        <div className="w">
          <Widget type="user" datas={len} />
        </div>

        <div className="listcontainer">
          <div className="listTitle">
            <p>UserDetails</p>
          </div>
          <Table heads={heading} rows={details || []} />
        </div>
      </div>
    </div>
  );
};
export default Customer;
