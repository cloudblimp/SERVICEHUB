import React, { useState } from "react";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import ServiceReport from "./ServiceReport";
import CategoryReport from "./CategoryReport";
import { Button } from "@material-tailwind/react";
import FeedbackReport from "./FeedbackReport";
import BookingReport from "./BookingReport";
import TotalSales from "./TotalSales";
import MostPopularServiceReport from "./MostPopularServiceReposrt";
import ServiceProviderReport from "./ServiceProviderReport";
import ChatReport from "./ChatReport";
const Report = ({ rtype }) => {
  const [reportType, setReportType] = useState(rtype);

  const handleReportClick = (type) => {
    setReportType(type);
  };

  return (
    <div className="listbox ">
      <Sidebar handleReportClick={handleReportClick} />
      <div className="listboxcontainer px-10 py-5 ">
        <div className="my-3"></div>
        {reportType === "Category" && <CategoryReport />}
        {reportType === "Service" && <ServiceReport />}
        {reportType === "Feedback" && <FeedbackReport />}
        {reportType === "Booking" && <BookingReport />}
        {reportType === "TotalSales" && <TotalSales />}
        {reportType === "MostPopular" && <MostPopularServiceReport />}
        {reportType === "ServiceProvider" && <ServiceProviderReport />}
        {reportType === "Chat" && <ChatReport />}
      </div>
    </div>
  );
};

export default Report;
