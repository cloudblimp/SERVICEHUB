// Service.js
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import "./Service.css";
import Servicetable from "./Servicetable";
import { Button, Dialog } from "@material-tailwind/react";

import AddNestedCategory from "./AddNestedService";
import AddService from "./AddService";
import { getdata } from "../../../services/Apis";
import AddSubCategory from "./AddSubCategory";
import AddMiniCat from "./AddMiniCat";

const Service = () => {
  const [Dopen, setDOpen] = useState(false);
  const [Sopen, setSOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [Mopen, setMOpen] = useState(false);
  // const { newData, open, setOpen, Data } = useNewData(); // Consume the context
  const [details, setDetails] = useState([]);
  const [heading, setHeading] = useState();
  const [details1, setDetails1] = useState([]);
  const [heading1, setHeading1] = useState();
  const [Ndetails, setNDetails] = useState([]);
  const [Nheading, setNHeading] = useState();
  const [Mdetails, setMDetails] = useState([]);
  const [Mheading, setMHeading] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDOpen = () => setDOpen(true);
  const handleSOpen = () => setSOpen(true);
  const handleDClose = () => setDOpen(false);
  const handleSClose = () => setSOpen(false);
  const handleMOpen = () => setMOpen(true);
  const handleMClose = () => setMOpen(false);
  useEffect(() => {
    fetchData();
    fetchSubCatData();
    fetchNestedcatData();
    fetchminicatData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getdata("/cat/getAllCat");
      const data = response.data.data;
      setDetails(response.data.data);
      if (response.data.data.length > 0) {
        const headKeys = Object.keys(data[0]).filter((key) => key !== "__v");
        setHeading(headKeys);
        console.log("heading:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSubCatData = async () => {
    try {
      const response = await getdata("/subcat/getAllSubCat");
      const data = response.data.data;
      setDetails1(response.data.data);
      if (response.data.data.length > 0) {
        const headKeys = Object.keys(data[0]).filter((key) => key !== "__v");
        setHeading1(headKeys);
        console.log("heading:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchNestedcatData = async () => {
    try {
      const response = await getdata("/nestedcat/getAllNestCat");
      const data = response.data.data;
      setNDetails(response.data.data);
      if (response.data.data.length > 0) {
        const headKeys = Object.keys(data[0]).filter((key) => key !== "__v");
        setNHeading(headKeys);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchminicatData = async () => {
    try {
      const response = await getdata("/minicat/getAllMiniCat");
      const data = response.data.data;
      setMDetails(response.data.data);
      if (response.data.data.length > 0) {
        const headKeys = Object.keys(data[0]).filter((key) => key !== "__v");
        setMHeading(headKeys);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="flex w-[100vw]">
      <Sidebar />
      <div className="w-[85%] bg-slate-50">
        <div className="listcontainer ">
          <div className="service-heading ">
            <div className="listTitle">Service Category</div>
            <Button
              color="green"
              className="flex items-center gap-3"
              size="sm"
              onClick={handleDOpen}
            >
              <i className="fa-solid fa-user-plus"></i> Add Service Category
            </Button>
          </div>
          <Servicetable
            TABLE_HEAD={heading || []}
            TABLE_ROWS={details || []}
            flag="serviceCat"
          />
        </div>

        <div className="listcontainer ">
          <div className="service-heading ">
            <div className="listTitle">Sub Service Category</div>
            <Button
              color="green"
              className="flex items-center gap-3"
              size="sm"
              onClick={handleSOpen}
            >
              <i className="fa-solid fa-user-plus"></i> Add Sub Category
            </Button>
          </div>
          <Servicetable
            TABLE_HEAD={heading1 || []}
            TABLE_ROWS={details1 || []}
            flag="SubServiceCat"
            categoryNames={details}
          />
        </div>

        <div className="listcontainer ">
          <div className="service-heading ">
            <div className="listTitle">Services Offered</div>
            <Button
              color="green"
              className="flex items-center gap-3"
              size="sm"
              onClick={handleOpen}
            >
              <i className="fa-solid fa-user-plus"></i> Add Nested Service
              Category
            </Button>
          </div>
          <Servicetable
            TABLE_HEAD={Nheading}
            TABLE_ROWS={Ndetails}
            flag="NestedSubServiceCat"
            categoryNames={details1}
          />
        </div>

        <div className="listcontainer ">
          <div className="service-heading ">
            <div className="listTitle">Mini category Service Offered</div>
            <Button
              color="green"
              className="flex items-center gap-3"
              size="sm"
              onClick={handleMOpen}
            >
              <i className="fa-solid fa-user-plus"></i> Add Mini Service
              Category
            </Button>
          </div>
          <Servicetable
            TABLE_HEAD={Mheading}
            TABLE_ROWS={Mdetails}
            flag="MiniServiceCat"
            categoryNames={Ndetails}
          />
        </div>
      </div>
      {/* main Service */}
      <Dialog
        size="lg"
        open={Dopen}
        onClose={Dopen}
        className="bg-transparent shadow-none"
      >
        <i
          className="fa-solid fa-xmark fa-xl absolute top-8 right-[19rem] z-20 text-red-500"
          onClick={handleDClose}
        />
        <AddService />
      </Dialog>
      {/* nested sub category */}
      <Dialog
        size="lg"
        open={open}
        onClose={handleClose}
        className="bg-transparent shadow-none"
      >
        <i
          className="fa-solid fa-xmark fa-xl absolute top-8 right-[21rem] z-20 text-red-500"
          onClick={handleClose}
        />
        <AddNestedCategory />
      </Dialog>
      {/* sub category */}
      <Dialog
        size="lg"
        open={Sopen}
        onClose={Sopen}
        className="bg-transparent shadow-none"
      >
        <i
          className="fa-solid fa-xmark fa-xl absolute top-8 right-[3rem] z-20 text-red-500"
          onClick={handleSClose}
        />
        <AddSubCategory />
      </Dialog>
      {/* mini category */}
      <Dialog
        size="lg"
        open={Mopen}
        onClose={Mopen}
        className="bg-transparent shadow-none"
      >
        <i
          className="fa-solid fa-xmark fa-xl absolute top-8 right-[3rem] z-20 text-red-500"
          onClick={handleMClose}
        />
        <AddMiniCat />
      </Dialog>
    </div>
  );
};

export default Service;
