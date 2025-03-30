import Sidebar from "../../../Dashboard/Sidebar/Sidebar";
import Chart from "../../Charts/Chart";
import Table2 from "../Table2";
import { useState, useEffect } from "react";
import axios from "axios";
import "./SingleProvider.css";
import { Avatar } from "@material-tailwind/react";
import { DocumentHead, DocumentRows } from "../../../../Data/Admin/Database";
import ProvidingTable from "../../../../Pages/Provider/services/ProvidingTable";
const SingleProvider = () => {
  const [data, setdata] = useState(null);
  useEffect(() => {
    const spID = localStorage.getItem("userID");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/sp/getSpById/" + spID
        );
        console.log("Singleprovider data fetch :", response.data.data);
        setdata(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (data === null) {
    return <div>Loading...</div>;
  }
  console.log("Data Fetch:", data);
  return (
    <div className="single">
      <Sidebar />
      <div className="singlecontainer">
        <div className="topS">
          <div className="leftS">
            <h1>Information</h1>
            <div className="item">
              <Avatar src={data.photo} alt="avatar" size="xxl" />
              <div className="details">
                <h1>
                  {data.firstName} {data.lastName}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phoneNo}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{data.address}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Rating:</span>
                  <span className="itemValue">{data.avgRating || ""}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date of Joining:</span>
                  <span className="itemValue">{data.doj.slice(0, 10)}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">
                    {data.gender === 1
                      ? "male"
                      : data.gender === 2
                      ? "female"
                      : "others"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="rightS">
            <Chart />
          </div>
        </div>
        <div className="listcontainer">
          <div className="listTitle">Service Offered Details</div>
          {/* <Table2 heads={ServiceOfferedHead} rows={ServiceOfferedRows} /> */}
          <ProvidingTable spid={data._id} />
        </div>
        {/* <div className="listcontainer">
          <div className="listTitle">Document Details</div>
          <Table2 heads={DocumentHead} rows={DocumentRows} />
        </div> */}
      </div>
    </div>
  );
};
export default SingleProvider;
