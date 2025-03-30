import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import { ChatHead, ChatRows } from "../../../Data/Admin/Database";
import ChatTable from "../../../components/Admin/Sp/ChatTable";
import { useEffect } from "react";
import axios from "axios";
const Chat = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/chat/getAllChat");
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="provider">
      <Sidebar />
      <div className="providercontainer bg-gray-100">
        <div className="bg-white mx-[1rem] my-[3rem] p-4">
          <div className="flex items-center justify-between heading">
            <div className="listTitle ">Chat Details</div>
          </div>
          <ChatTable heads={ChatHead} rows={ChatRows} url="chatview" />
        </div>
      </div>
    </div>
  );
};
export default Chat;
