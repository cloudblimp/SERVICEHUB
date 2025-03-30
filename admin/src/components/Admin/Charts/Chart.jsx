import { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const spID = localStorage.getItem("userID");
    try {
      const response1 = await axios.get(
        "http://localhost:1000/service/getServiceByID/" + spID
      );
      const data1 = response1.data.data;
      console.log("hijswid: ", data1);
      const chart = data1.map((item) => ({
        name: item.mini_cat_id.mini_cat_name,
        value: item.price,
      }));

      setChartData(chart);
      console.log("Chart data:", chart);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={chartData} fill="#8884d8" label="name" />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

// const Chart = ({ aspect, title }) => {
//   const [chartData, setChartData] = useState([]);
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const spID = localStorage.getItem("userID");
//     try {
//       const response1 = await axios.get(
//         "http://localhost:1000/service/getServiceByID/" + spID
//       );
//       const data1 = response1.data.data;

//       // Constructing chart data directly from data1
//       const chart = data1.map((item) => ({
//         name: item.mini_cat_id,
//         Total: item.price,
//       }));

//       setChartData(chart);
//       console.log("Chart data:", chart);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   return (
//     <div className="chart">
//       <div className="title">{title}</div>

//       <ResponsiveContainer width="100%" aspect={aspect}>
//         <AreaChart
//           width={750}
//           height={350}
//           data={chartData}
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <defs>
//             <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip />
//           <Area
//             type="monotone"
//             dataKey="Total"
//             stroke="#8884d8"
//             fillOpacity={1}
//             fill="url(#total)"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };
// export default Chart;
