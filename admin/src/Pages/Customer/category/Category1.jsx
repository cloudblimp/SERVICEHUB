import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Customer/Navbar/Navbar";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Typography, List, ListItem } from "@material-tailwind/react";

import { getdata, getdatabyid } from "../../../services/Apis";
import { Element } from "./Selected";
const Category1 = () => {
  const [categories, setCategories] = useState([]);
  const [minicategory, setMiniCategory] = useState([]);
  const [mini, setMini] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null); // Define openAccordion state
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getdata("/nestedcat/getAllNestCat");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpen = async (id) => {
    if (openAccordion === id) {
      setOpenAccordion(null); // Close the accordion if it's already open
      setMiniCategory({}); // Clear the minicategory data
    } else {
      setOpenAccordion(id); // Open the clicked accordion
      try {
        const resp = await getdatabyid(`/minicat/getMini/${id}`);
        console.log("mini cat", resp.data.data);
        setMiniCategory(resp.data.data);
      } catch (error) {
        console.error("Problem haiii", error);
      }
    }
  };
  const handleopenmini = async (tag) => {
    try {
      const resp = await getdatabyid(`/minicat/getMiniBytag/${tag}`);
      console.log("mini", resp.data.data);
      setMini(resp.data.data);
    } catch (error) {
      console.error("Problem haiii", error);
    }
  };
  console.log("mini", mini);
  return (
    <>
      <div className="z-40 fixed">
        <Navbar />
      </div>

      <aside
        id="sidebar"
        className="fixed z-0 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto shadow-md">
          <div className="flex-1 px-3 bg-white divide-y space-y-1 ">
            {categories.map((category) => (
              <Accordion
                key={category._id}
                open={openAccordion === category._id}
                icon={
                  <i
                    className={`fa-solid fa-angle-up mx-auto h-4 w-4 transition-transform ${
                      openAccordion === category._id ? "rotate-180" : ""
                    }`}
                  ></i>
                }
              >
                <li className="list-none"></li>
                <ListItem className="p-0">
                  <AccordionHeader
                    onClick={() => handleOpen(category._id)}
                    className="border-b-0 p-3 cursor-pointer"
                  >
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      {category.nest_category_name}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                {openAccordion === category._id && (
                  <AccordionBody className="mr-auto font-normal">
                    {minicategory.length > 0 ? (
                      <div>
                        {Array.from(
                          new Set(minicategory.map((cat) => cat.tag))
                        ).map((tag) => (
                          <Typography
                            key={tag}
                            className="ml-4 mb-4 hover:bg-yellow-50 py-2 px-1 "
                            onClick={() => handleopenmini(tag)}
                          >
                            {tag}
                          </Typography>
                        ))}
                      </div>
                    ) : (
                      <Typography>No data available</Typography>
                    )}
                  </AccordionBody>
                )}
              </Accordion>
            ))}
          </div>
        </div>
      </aside>
      <div className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
        <div>
          {mini.map((cat) => (
            <Element data={cat} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Category1;
