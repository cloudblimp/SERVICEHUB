// // Import necessary dependencies
// import React, { useEffect, useState } from "react";
// import { getdata } from "../../../services/Apis";
// import Navbar from "../../../components/Customer/Navbar/Navbar";
// import Pop from "./Pop";
// import { Cart } from "./Cart";

// export const Category2 = () => {
//   const [service, setService] = useState([]);
//   const [filteredServiceProviders, setFilteredServiceProviders] = useState([]);
//   const [dayName, setDayName] = useState("");
//   const [timeslot, setTimeslot] = useState("");

//   useEffect(() => {
//     const service_date = localStorage.getItem("Date");
//     const parsedDate = new Date(service_date);
//     if (isNaN(parsedDate.getTime())) {
//       console.error("Invalid date value:", service_date);
//       // Handle invalid date value
//     } else {
//       setDayName(
//         new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(parsedDate)
//       );
//     }

//     const storedTime = localStorage.getItem("Time");
//     if (storedTime) {
//       switch (storedTime) {
//         case "9:00 AM":
//         case "10:00 AM":
//         case "11:00 AM":
//           setTimeslot("Morning");
//           break;
//         case "12:00 PM":
//         case "1:00 PM":
//         case "2:00 PM":
//         case "3:00 PM":
//         case "4:00 PM":
//           setTimeslot("Afternoon");
//           break;
//         case "5:00 PM":
//         case "6:00 PM":
//         case "7:00 PM":
//         case "8:00 PM":
//           setTimeslot("Evening");
//           break;
//         default:
//           console.error("Invalid time value:", storedTime);
//           setTimeslot(""); // Handle invalid time value
//       }
//     } else {
//       console.error("Time value not found in localStorage");
//       setTimeslot(""); // Handle case where time value is not found in localStorage
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     filterServiceProviders();
//   }, [service, dayName, timeslot]);

//   const fetchData = async () => {
//     const id = localStorage.getItem("MinicatID");
//     try {
//       const response = await getdata(`/service/getServiceByMini/${id}`);
//       setService(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const filterServiceProviders = async () => {
//     const filteredProviders = [];
//     await Promise.all(
//       service.map(async (provider) => {
//         const availabilityArray = await getAvailability(provider.sp_id);
//         availabilityArray.forEach((availability) => {
//           if (
//             availability.dayOfWeek === dayName &&
//             availability.availableSlots.some((slot) => slot.slot === timeslot)
//           ) {
//             filteredProviders.push(provider);
//           }
//         });
//       })
//     );
//     setFilteredServiceProviders(filteredProviders);
//   };

//   const getAvailability = async (spId) => {
//     try {
//       const response = await getdata(`/spavl/getSpAvl/${spId}`);
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching availability:", error);
//       return null;
//     }
//   };

//   return (
//     <div className="flex flex-col w-screen bg-gray-200">
//       <Navbar />
//       <div className="flex items-center justify-center ml-[2%]">
//         <div className="px-8 pt-4 pb-20 flex flex-wrap gap-x-10 gap-y-5">
//           {filteredServiceProviders.map((data) => (
//             <Section2 key={data.sp_id} data={data} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// const Section2 = ({ data }) => {
//   const [sp, setsp] = useState([]);
//   useEffect(() => {
//     if (data) {
//       fetchsp();
//     }
//   }, [data]);
//   // console.log("spdetails", data);
//   const fetchsp = async () => {
//     try {
//       const response = await getdata(`/sp/getSpById/${data.sp_id}`);
//       setsp(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   if (!sp) {
//     return null; // Or render a loading indicator
//   } else {
//     return (
//       <div className="shadow-lg rounded-md p-4 h-[32vh] w-[20rem] flex flex-col bg-white">
//         <div className="flex justify-between items-center border-b-2 pb-4">
//           <span className="flex items-center space-x-2">
//             <div className=" w-[5vw] h-[5vw] rounded-full overflow-hidden">
//               <img
//                 src={sp.photo ? sp.photo : ""}
//                 alt="User image"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <span className="text-md">
//               {sp.firstName} {sp.lastName}
//             </span>
//           </span>
//           <span className="text-xl font-bold px-4 ml-3">Rs.{data.price}</span>
//         </div>
//         <div className="flex justify-evenly h-[3.5rem] text-[14px] py-2 mt-2">
//           <div className="flex flex-col items-center justify-center pr-2">
//             <div className="font-semibold">Rating</div>
//             <div></div>
//           </div>
//           <div className="border-r-2 p-0"></div>
//           <div className="flex flex-col items-center justify-center pr-3 pl-3">
//             <div className="font-semibold">Time</div>
//             <div>{data.service_time} hrs</div>
//           </div>
//           <div className="border-r-2 p-0"></div>
//           <div className="flex flex-col items-center justify-center pl-2">
//             <div className="font-semibold">Experience</div>
//             <div>{data.yoe}</div>
//           </div>
//         </div>
//         <div className="flex items-center justify-center mt-2">
//           <Pop />
//           <Cart
//             price={data.price}
//             name={`${sp.firstName} ${sp.middleName} ${sp.lastName}`}
//             id={data._id}
//           />
//         </div>
//       </div>
//     );
//   }
// };

import React, { useEffect, useState } from "react";
import { getdata } from "../../../services/Apis";
import Navbar from "../../../components/Customer/Navbar/Navbar";
import Pop from "./Pop";
import { Cart } from "./Cart";
import { useNavigate } from "react-router-dom";

export const Category2 = () => {
  const [dayName, setDayName] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [filterProviders, setFilterProvider] = useState([]);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const service_date = localStorage.getItem("Date");
      const parsedDate = new Date(service_date);
      if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date value:", service_date);
        return;
      } else {
        setDayName(
          new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
            parsedDate
          )
        );
      }

      const storedTime = localStorage.getItem("Time");
      if (storedTime) {
        switch (storedTime) {
          case "9:00 AM":
          case "10:00 AM":
          case "11:00 AM":
            setTimeslot("Morning");
            break;
          case "12:00 PM":
          case "1:00 PM":
          case "2:00 PM":
          case "3:00 PM":
          case "4:00 PM":
            setTimeslot("Afternoon");
            break;
          case "5:00 PM":
          case "6:00 PM":
          case "7:00 PM":
          case "8:00 PM":
            setTimeslot("Evening");
            break;
          default:
            console.error("Invalid time value:", storedTime);
            setTimeslot("");
        }
      } else {
        console.error("Time value not found in localStorage");
        setTimeslot("");
      }

      const id = localStorage.getItem("MinicatID");
      try {
        const response = await getdata(`/service/getServiceByMini/${id}`);
        setServices(response.data.data);
        console.log("working");
        console.log(response.data.data);

        // for (const service of services) {
        //   const availabilityArray = await getAvailability(service.sp_id);
        //   availabilityArray.forEach((availability) => {
        //     if (
        //       availability.dayOfWeek === dayName &&
        //       availability.availableSlots.some((slot) => slot.slot === timeslot)
        //     ) {
        //       setFilterProvider([...filterProviders, service]);
        //     }
        //   });
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dayName, timeslot]);

  // const getAvailability = async (spId) => {
  //   try {
  //     const response = await getdata(`/spavl/getSpAvl/${spId}`);
  //     return response.data.data;
  //   } catch (error) {
  //     console.error("Error fetching availability:", error);
  //     return null;
  //   }
  // };

  return (
    <div className="flex flex-col w-screen bg-gray-200">
      <Navbar />
      <div className="w-full flex justify-start">
        <button
          className="bg-blue-400 py-2 px-4 rounded-full m-5"
          onClick={() => navigate(-1)}
        >
          <h2>Back</h2>
        </button>
      </div>
      <div className="flex items-center justify-center ml-[2%]">
        <div className="px-8 pt-4 pb-20 flex flex-wrap gap-x-10 gap-y-5">
          {services.map((data, i) => (
            <Section2 data={data} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Section2 = ({ data }) => {
  const [sp, setSp] = useState(null);

  useEffect(() => {
    if (data) {
      fetchSp();
    }
  }, [data]);

  const fetchSp = async () => {
    try {
      const response = await getdata(`/sp/getSpById/${data.sp_id}`);
      setSp(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!sp) {
    return null;
  } else {
    return (
      <div className="shadow-lg rounded-md p-4 h-[32vh] w-[20rem] flex flex-col bg-blue-500">
        <div className="flex justify-between items-center border-b-2 pb-4">
          <span className="flex items-center space-x-2">
            <div className=" w-[5vw] h-[5vw] rounded-full overflow-hidden">
              <img
                src={sp.photo ? sp.photo : ""}
                alt="User image"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-md">
              {sp.firstName} {sp.lastName}
            </span>
          </span>
          <span className="text-xl font-bold px-4 ml-3">Rs.{data.price}</span>
        </div>
        <div className="flex justify-evenly h-[3.5rem] text-[14px] py-2 mt-2">
          <div className="flex flex-col items-center justify-center pr-2">
            <div className="font-semibold">Rating</div>
            <div></div>
          </div>
          <div className="border-r-2 p-0"></div>
          <div className="flex flex-col items-center justify-center pr-3 pl-3">
            <div className="font-semibold">Time</div>
            <div>{data.service_time} hrs</div>
          </div>
          <div className="border-r-2 p-0"></div>
          <div className="flex flex-col items-center justify-center pl-2">
            <div className="font-semibold">Experience</div>
            <div>{data.yoe}</div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <Pop />
          <Cart
            price={data.price}
            name={`${sp.firstName} ${sp.middleName} ${sp.lastName}`}
            id={data._id}
          />
        </div>
      </div>
    );
  }
};

export default Category2;
