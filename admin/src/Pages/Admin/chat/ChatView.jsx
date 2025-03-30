import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import Table2 from "../../../components/Admin/Sp/Table2";
import { MessageHead, MessageRow } from "../../../Data/Admin/Database";
import { useEffect } from "react";
import axios from "axios";
export const Chatview = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/chat/getAllMessage"
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singlecontainer bg-gray-100">
        <div className="bg-white mx-[1rem] my-[3rem] p-4">
          <div className="listTitle">Message Information</div>
          <Table2 heads={MessageHead} rows={MessageRow} />
        </div>
      </div>
    </div>
  );
};
