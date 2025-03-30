import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import "./Provider.css";
import Widget from "../../../components/Dashboard/Widget";
import Datatable from "../../../components/Admin/Sp/DataTable";
import Edittable from "../../../components/Admin/Sp/Edittable";
import { useState, useEffect } from "react";
import { approveSp, getdata } from "../../../services/Apis";
const Provider = () => {
  const [len, setLen] = useState();
  const [details, setDetails] = useState([]);
  const [heading, setHeading] = useState();
  const [filteredServiceProviders, setFilteredServiceProviders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getdata("/sp/getAllSp");
      const data = response.data.data;
      setLen(response.data.data.length);
      if (data.length > 0) {
        const headKeys = Object.keys(data[0]).filter(
          (key) => key !== "__v" && key !== "password"
        );
        setHeading(headKeys);
        setDetails(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // Filter service providers where approval is false
    setFilteredServiceProviders(
      details.filter((provider) => !provider.approval)
    );
  }, [details]);
  const handleRowTransfer = async (row) => {
    let newApprovalStatus = !row.approval; // Toggle the approval status
    try {
      const response = await approveSp(row._id, {
        approval: newApprovalStatus,
      });

      if (response.status === 201) {
        // Update the details state to reflect the approval status change
        setDetails((prevDetails) =>
          prevDetails.map((item) =>
            item._id === row._id
              ? { ...item, approval: newApprovalStatus }
              : item
          )
        );
        alert("Service provider status updated successfully");
      }
    } catch (error) {
      console.error("Error updating service provider status:", error.message);
      alert("An error occurred while updating service provider status");
    }
  };

  return (
    <div className="provider">
      <Sidebar />
      <div className="providercontainer">
        <div className="widgets">
          <Widget
            type="aprovider"
            datas={len - filteredServiceProviders.length}
          />
          <Widget type="dprovider" datas={filteredServiceProviders.length} />
          <Widget type="tprovider" datas={len} />
        </div>
        <div className="listcontainer">
          <div className="listTitle">Provider waiting for Approval</div>
          <Edittable
            heads={heading}
            rows={filteredServiceProviders}
            onRowTransfer={handleRowTransfer}
          />
        </div>
        <div className="listcontainer">
          <div className="listTitle">Service Provider Details</div>
          <Datatable heads={heading} rows={details} url="providerId" />
        </div>
      </div>
    </div>
  );
};
export default Provider;
