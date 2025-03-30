import { useEffect, useState } from "react";
import { addFunction } from "../../services/Apis";

const ChatBox = ({ order, disabled }) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatID, setChatID] = useState("");
  const [prevChatMessages, setPrevChatMessages] = useState(0);

  useEffect(() => {
    setPrevChatMessages(chatMessages.length);
  }, [chatMessages]);

  const toggleChatbox = () => {
    if (disabled == "false") {
      setIsChatboxOpen(isChatboxOpen);
      alert("This Option will be available after the order has been completed");
    } else {
      setIsChatboxOpen(!isChatboxOpen);
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim() !== "") {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, isUser: true },
      ]);
      setUserInput("");
    }
    const currentTime = new Date();
    const ISTDateTime = currentTime.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata", // Set the time zone to IST
    });
    const Details = {
      user_id: order.user_id._id,
      sp_id: order.service_id.sp_id._id,
      order_id: order._id,
      chat_date: ISTDateTime,
    };

    try {
      const response = await addFunction(Details, "/chat/addChat");
      console.log("success Chat Id", response.data.data);
      setChatID(response.data.data._id);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    const sendChatMessage = async () => {
      const chatMessage = {
        chats: chatMessages.slice(-1), // Get only the last message
        chat_id: chatID,
        Sender_id: order.user_id._id,
        receiver_id: order.service_id.sp_id._id,
      };
      console.log("hi inside chat");
      try {
        const res = await addFunction(chatMessage, "/message/addMessage");
        console.log("Message", res.data.data);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    if (chatID && chatMessages.length > prevChatMessages) {
      sendChatMessage();
    }
  }, [chatID, chatMessages, prevChatMessages]);

  return (
    <>
      <div className="mt-3">
        <button
          onClick={toggleChatbox}
          className={`text-white text-sm py-1 px-3 rounded-md transition duration-300 flex items-center ${
            disabled ? "bg-[#1A3570]" : "bg-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Chat
        </button>
      </div>

      {isChatboxOpen && (
        <div className="fixed bottom-16 right-4 w-96">
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-[#FCA311] text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">
                Chat with {order.service_id.sp_id.firstName}
              </p>
              <button
                onClick={toggleChatbox}
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div id="chatbox" className="p-4 h-80 overflow-y-auto">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={message.isUser ? "mb-2 text-right" : "mb-2"}
                >
                  <p
                    className={`${
                      message.isUser
                        ? "bg-[#1A3570] text-white"
                        : "bg-gray-200 text-gray-700"
                    } rounded-lg py-2 px-4 inline-block font-normal`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                placeholder="Type a message"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#1A3570] text-black font-thin"
              />
              <button
                id="send-button"
                onClick={handleSendMessage}
                className="bg-[#FCA311] text-white px-4 py-2 rounded-r-md hover:bg-[#FCA311] transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
