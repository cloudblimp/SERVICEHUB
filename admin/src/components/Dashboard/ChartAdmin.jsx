import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response1 = await axios.get(
        "http://localhost:1000/minicat/getAllMiniCat"
      );
      const data1 = response1.data.data;

      const chart = data1.map((item) => ({
        name: item.mini_cat_name,
        min_price: item.min_price,
        max_price: item.max_price,
      }));

      setChartData(chart);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className=" bg-white w-[80rem] h-[30rem]">
        <div className="">
          <h1 className="text-gray-500 m-2 text-center font-bold">
            Price Range of Services
          </h1>
        </div>
        <ResponsiveContainer aspect={2 / 1}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="min_price"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="max_price"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
