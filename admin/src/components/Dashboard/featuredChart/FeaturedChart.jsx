import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import React, { PureComponent } from "react";
import { getdata } from "../../../services/Apis";
import { Legend, ResponsiveContainer } from "recharts";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Funnel,
  FunnelChart,
  LabelList,
  RadialBar,
  RadialBarChart,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];
const FeaturedChart = () => {
  const [len, setlen] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [mdetails, setMDetails] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const data = [
    { name: "Bathroom & Kitchen Cleaning", value: 4 },
    { name: "Sofa & Carpet Cleaning", value: 3 },
    { name: "Mini Services", value: 2 },
    { name: "Full Home Cleaning", value: 1 },
  ];

  const fetchData = async () => {
    try {
      const serviceReqResponse = await getdata("/serviceReq/getAllServiceReq");
      const nestedCatResponse = await getdata("/nestedcat/getAllNestCat");
      const serviceRequests = serviceReqResponse.data.data;
      const nestedCategories = nestedCatResponse.data.data; // Assuming this is the correct response structure

      // Count the number of requests for each nested category
      const requestCounts = {};
      serviceRequests.forEach((request) => {
        const nestedCategoryName =
          request.service_id.mini_cat_id.nested_cat_id.nest_category_name;
        requestCounts[nestedCategoryName] =
          (requestCounts[nestedCategoryName] || 0) + 1;
      });

      // Assign nested category name and request count
      const updatedMDetails = nestedCategories.map((category) => ({
        name: category.nest_category_name,
        value: requestCounts[category.nest_category_name] || 0,
      }));

      setMDetails(updatedMDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className=" bg-white w-[40rem] h-auto">
      <div className="">
        <h1 className="text-gray-500 m-2 text-center font-bold">
          Total Services Offering
        </h1>
      </div>
      <ResponsiveContainer aspect={2 / 1}>
        <RadialBarChart
          width={730}
          height={250}
          innerRadius="10%"
          outerRadius="80%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            label={{ fill: "#666", position: "insideStart" }}
            background
            clockWise={true}
            dataKey="value"
          />
          <Legend iconSize={10} width={120} verticalAlign="middle" />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default FeaturedChart;
