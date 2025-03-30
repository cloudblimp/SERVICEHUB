import React from "react";
import { LongDialog } from "./LongDialog";
import { Button } from "@material-tailwind/react";

import { Link } from "react-router-dom";
export const Element = (data) => {
  const handlestorage = (minicatname, id) => {
    localStorage.setItem("MinicatName", minicatname);
    localStorage.setItem("MinicatID", id);
  };
  return (
    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-[40px] border-2 border-white bg-white my-[100px] ">
      <div className="w-[300px]  md:w-1/3  h-[200px] grid place-items-center overflow-hidden object-fill relative">
        <img
          src={data.data.mini_cat_image}
          alt="tailwind logo"
          className="rounded-xl absolute inset-0 w-full h-full object-cover transform "
        />
      </div>
      <div className="w-full md:w-2/3 bg-white flex flex-col space-y-1 p-3 py-10">
        <div className="flex justify-between item-center">
          <p className="text-gray-500 font-medium hidden md:block">
            {data.data.tag}
          </p>
          {/* <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-gray-600 font-bold text-sm ml-1">
              abc
              <span className="text-gray-500 font-normal">(76 reviews)</span>
            </p>
          </div> */}
        </div>
        <h3 className="font-black text-gray-800 md:text-2xl text-xl">
          {data.data.mini_cat_name}
        </h3>

        <div className="sm:flex items-end justify-start py-2">
          <LongDialog color="blue" name={data.data.mini_cat_name} />
          <Link
            to="/datentime"
            className="block ml-3 text-center text-xs font-bold uppercase  transition hover:bg-yellow-400"
          >
            <Button
              color="yellow"
              className="rounded-none"
              onClick={() =>
                handlestorage(data.data.mini_cat_name, data.data._id)
              }
            >
              Select
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
