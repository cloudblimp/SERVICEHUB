import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import Chart from "../../../components/Admin/Charts/Chart";
import ProvidingTable from "../services/ProvidingTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "@material-tailwind/react";
const SpDashboard = () => {
  const [data, setdata] = useState(null);
  const loggedIn = localStorage.getItem("Loggedin");
  const spID = localStorage.getItem("userID");
  useEffect(() => {
    fetchData1();
  }, []);

  const fetchData1 = async () => {
    try {
      const response1 = await axios.get(
        "http://localhost:1000/sp/getSpById/" + spID
      );

      setdata(response1.data.data);
      console.log("datasp", response1.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="container">
        <div className="flex gap-10 mx-5 mt-10">
          <div className="topS flex gap-3 w-full">
            {loggedIn === "serviceprovider" && (
              <div className="leftS">
                <h1>Information</h1>
                {data && (
                  <div className="item">
                    <Avatar src={data.photo} alt="avatar" size="xxl" />
                    <div className="details">
                      <h1>
                        {data.firstName} {""}
                        {data.lastName}
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
                        <span className="itemValue">
                          {data.avgRating || ""}
                        </span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Date of Joining:</span>
                        <span className="itemValue">
                          {data.doj.slice(0, 10)}
                        </span>
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
                )}
              </div>
            )}
            <div className="rightS">
              {/* {loggedIn === "serviceprovider" ? (
                <Chart aspect={3 / 1} title="Service Providers Offerings" />
              ) : (
                <Chart
                  aspect={3 / 1}
                  title="Service Providers Earnings (Last 6 Months)"
                />
              )} */}
              <Chart />
            </div>
          </div>
        </div>
        {loggedIn === "serviceprovider" && (
          <div className="listcontainer">
            <div className="listTitle">Service Providing</div>
            <ProvidingTable spid={spID} />
          </div>
        )}
      </div>
    </div>
  );
};
export default SpDashboard;
