import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import ChatTable from "../../../components/Admin/Sp/ChatTable";
import { ChatHead, ChatRows } from "../../../Data/Admin/Database";
import ChatBoxSp from "./ChatBoxSp";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatsBoard = () => {
  const [chatboxes, setChatBoxes] = useState([]);

  useEffect(() => {
    const fetchChatIDs = async () => {
      try {
        const spID = localStorage.getItem("userID");
        const response = await axios.get(
          `http://localhost:1000/chat/getchatbyID/${spID}`
        );
        console.log("chatdata", response.data.data);
        setChatBoxes(response.data.data);
      } catch (error) {
        console.error("Error fetching chat IDs:", error);
      }
    };

    fetchChatIDs();
  }, []);

  return (
    <>
      <div className="provider">
        <Sidebar />
        <div className="providercontainer bg-gray-100">
          <div className="mx-[1rem] mt-[3rem] p-4">
            <h1 className="text-3xl">Chat With Customer</h1>
          </div>
          <div className="bg-white-100 mx-[1rem] my-[3rem] p-4">
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-[80%]"
            >
              {/* {chatboxes !chatboxes.map((chat) => (
                <li
                  key={chat._id}
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-xl"
                >
                  <div className="flex w-full items-center justify-between space-x-6 p-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-[#FCA311]">
                          {chat.order_id.customer}
                        </h3>
                      </div>
                      <p className="mt-1 truncate text-sm text-gray-500">
                        2 Classic Bathroom Cleaning
                      </p>
                      <span className="mt-1 truncate text-sm text-gray-500 ">
                        21-2-2024
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="-ml-px flex w-0 flex-1">
                        <a className="relative inline-flex w-0 flex-1 items-center justify-center  rounded-b-xl pb-3 font-bold text-white bg-[#1A3570]">
                          <ChatBoxSp />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatsBoard;
