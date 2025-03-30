import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Select,
  Option,
  Image,
  Input,
  Alert,
} from "@material-tailwind/react";

// Sample data for different categories
import {
  CleanService,
  ApplianceService,
  EPCService,
  Womensalon,
  MenSalon,
  HairStudio,
} from "../../Data/Customer/Database";
import { useNewData } from "../../Context/NewDataContext";
const Edit = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [selectedNestedCategory, setSelectedNestedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [nestedOptions, setNestedOptions] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [minicatname, setminicatname] = useState("");
  const [minicatid, setminicatid] = useState("");
  const [minprice, setminprice] = useState("");
  const [maxprice, setmaxprice] = useState("");
  const [offer, setoffer] = useState("");
  const [priceError, setPriceError] = useState("");
  const { rowData, setRowDataForEdit, Data, setData, setEOpen, Eopen } =
    useNewData();

  useEffect(() => {
    if (rowData) {
      setSelectedCategory(rowData.scategory);
      setSelectedParentCategory(rowData.parentcategory);
      setSelectedNestedCategory(rowData.nestedcategory);
      setSelectedSubCategory(rowData.nestedsubcategory);
      setminicatname(rowData.minicategoryname || "");
      setminicatid(rowData.minicategoryid || "");
      setminprice(rowData.minprice || "");
      setmaxprice(rowData.maxprice || "");
      setoffer(rowData.offerid || "");
      // Handle image update if needed
    }
  }, [rowData]);
  const handleClose = () => setEOpen(false);
  const categoryData = {
    home: {
      cleaning: CleanService,
      appliance: ApplianceService,
      epc: EPCService,
    },
    grooming: {
      womenSalon: Womensalon,
      mensalon: MenSalon,
      hairstudio: HairStudio,
    },
  };

  const handleImageUpload = (e) => {
    console.log(e.target.files);
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleCreate = () => {
    if (parseInt(minprice) > parseInt(maxprice)) {
      // Show an alert or handle the validation error as needed
      alert("Minimum price should not be greater than Maximum price");
      return;
    }

    if (!minicatname || !minprice || !maxprice) {
      // Show an alert or handle the validation error as needed
      alert("Please fill in all required fields");
      return;
    }

    if (
      !selectedCategory ||
      !selectedParentCategory ||
      !selectedNestedCategory ||
      !selectedSubCategory ||
      !minicatname ||
      !minprice ||
      !maxprice
    ) {
      // Show an alert or handle the validation error as needed
      alert("Please fill in all fields");
      return;
    }

    const newDataItem = {
      minicategoryid: minicatid,
      minicategoryname: minicatname,
      nestedsubcategory: rowData.nestedsubcategory,
      nestedcategory: rowData.nestedcategory,
      parentcategory: rowData.parentcategory,
      scategory: rowData.scategory,
      minprice: minprice,
      maxprice: maxprice,
      minicategoryimage: "img",
      offerid: offer,
    };

    const updatedData = [...Data]; // Create a copy of the original data array
    const index = Data.findIndex(
      (item) => item.minicategoryid === newDataItem.minicategoryid
    ); // Find the index of the item to be updated
    if (index !== -1) {
      updatedData[index] = newDataItem; // Update the item at the found index
      setData(updatedData); // Update the context data with the modified array
    }

    setRowDataForEdit(newDataItem, index);

    handleClose();
  };
  const handlename = (e) => {
    setminicatname(e.target.value);
  };

  const handleoffer = (e) => {
    setoffer(e.target.value);
  };
  const handleminPrice = (e) => {
    const value = e.target.value;
    setminprice(value);

    if (
      value !== "" &&
      maxprice !== "" &&
      parseFloat(value) > parseFloat(maxprice)
    ) {
      setPriceError("Minimum price should not be greater than Maximum price");
    } else {
      setPriceError("");
    }
  };

  const handlemaxPrice = (e) => {
    const value = e.target.value;
    setmaxprice(value);
    if (
      value !== "" &&
      minprice !== "" &&
      parseFloat(value) < parseFloat(minprice)
    ) {
      setPriceError("Maximum price should not be less than Minimum price");
    } else {
      setPriceError("");
    }
  };
  return (
    <>
      <Card className="mx-auto w-fit relative">
        <CardBody className="flex flex-col gap-4">
          <Typography className="text-[#1A3570] font-bold" variant="h6">
            Add new Service
          </Typography>
          <div className="flex gap-4">
            <Select
              label="Category"
              // onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <Option value="">Select Category</Option>
              <Option value="home">Home Service</Option>
              <Option value="grooming">Grooming Service</Option>
            </Select>
            <Select
              label="Parent Category"
              // onChange={handleParentChange}
              value={selectedParentCategory}
            >
              {selectedCategory &&
                Object.keys(categoryData[selectedCategory] || {}).map(
                  (option) => (
                    <Option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Option>
                  )
                )}
            </Select>

            <Select
              label="Nested Category"
              // onChange={(value) => handleNestedChange(value)}
              value={selectedNestedCategory}
            >
              {nestedOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>

            <Select
              label="Nested Sub Category"
              // onChange={handleSubCategoryChange}
              value={selectedSubCategory}
            >
              {subOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="text"
                label="Mini Category name"
                onChange={handlename}
                value={minicatname}
              />
            </span>
            <span>
              <Input type="number" label="Mini Category ID" value={minicatid} />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="number"
                label="Mininum Price"
                isRequired
                onChange={handleminPrice}
                value={minprice}
              />
            </span>
            <span>
              <Input
                type="number"
                label="Maximum Price"
                onChange={handlemaxPrice}
                value={maxprice}
              />
            </span>
          </div>
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div className="w-[50%]">
            <Input
              type="number"
              label="Offer ID"
              onChange={handleoffer}
              value={offer}
            />
            {/* <img src={uploadedImage} /> */}
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            className="bg-[#1A3570]"
            fullWidth
            onClick={handleCreate}
            onClose={handleClose}
            disabled={!minicatname || !minprice || !maxprice} // Disable the button if required fields are not filled
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Edit;
