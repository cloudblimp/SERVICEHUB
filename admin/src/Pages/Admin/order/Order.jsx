import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import { getdata } from "../../../services/Apis";
import Widget from "../../../components/Dashboard/Widget";
import OrderTable from "../../../components/Admin/Sp/OrderTable";

import { useState, useEffect } from "react";
const AOrder = () => {
  const [service, setServices] = useState([]);
  const [len, setLen] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getdata(`/serviceReq/getAllServiceReq`);
      console.log(res.data.data);
      setServices(res.data.data);
      setLen(res.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const heading = [
    "service_name",
    "customer",
    "provider",
    "date",
    "time",
    "price",
    "booking_status",
    "payment_status",
  ];
  return (
    <div className="provider">
      <Sidebar />
      <div className="providercontainer bg-slate-50">
        <div className="widgets">
          <Widget type="Torders" datas={len} />
          <Widget type="Porders" datas={0} />
          <Widget type="Corders" datas={2} />
        </div>

        <div className="listcontainer">
          <div className="listTitle">Order Details</div>
          <OrderTable heads={heading} rows={service} />
        </div>
      </div>
    </div>
  );
};
export default AOrder;
