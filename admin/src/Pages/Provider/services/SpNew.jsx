import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import { getdata, getdatabyid, addFunction } from "../../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNewData } from "../../../Context/NewDataContext";
const SpNew = () => {
  const { open, setOpen } = useNewData();
  const [formData, setFormData] = useState({
    mini_cat_id: "",
    sp_id: "",
    price: "",
    admin_commission: 2,
    sp_earning: "",
    service_time: "",
    yoe: "",
    created_at: new Date().toISOString().split("T")[0],
    updated_at: "",
  });
  const [categories, setCategories] = useState([]);
  const [minicategory, setMiniCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  useEffect(() => {
    handleopenmini(selectedCategory);
  }, [selectedCategory]);

  const handleopenmini = async (id) => {
    try {
      const resp = await getdatabyid(`/minicat/getMini/${id}`);
      setMiniCategory(resp.data.data);
    } catch (error) {
      console.error("Problem haiii", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      mini_cat_id: e,
    });
  };

  const handleCreate = async () => {
    const price = parseFloat(formData.price);
    const adminCommission = 0.02;
    const spEarning = price * (1 - adminCommission);

    const id = localStorage.getItem("userID");

    const serviceData = {
      ...formData,
      sp_earning: spEarning.toFixed(2),
      sp_id: id,
    };

    try {
      const response = await addFunction(serviceData, "/service/addService");
      if (response) {
        toast.success("Success: Service Added", {
          position: "top-center",
          autoClose: 2000, // Close the toast after 3 seconds
        });
        setFormData({
          mini_cat_id: "",
          sp_id: "",
          price: "",
          admin_commission: 2,
          sp_earning: "",
          service_time: "",
          yoe: "",
          created_at: new Date().toISOString().split("T")[0],
          updated_at: "",
        }); // Reset form data
        setOpen(false);
      } else {
        console.log("error adding offer");
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };
  return (
    <>
      <ToastContainer />
      <Card className="mx-auto w-fit relative" open={open}>
        <CardBody className="flex flex-col gap-4">
          <Typography className="text-[#1A3570] font-bold" variant="h6">
            Add new Service
          </Typography>
          <div className="flex gap-4">
            <Select
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e)}
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.nest_category_name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex gap-4">
            <Select
              label="Category"
              name="mini_cat_id"
              onChange={(e) => handleChange(e)}
            >
              {minicategory.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.mini_cat_name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex gap-4">
            {minicategory
              .filter((category) => category._id === formData.mini_cat_id)
              .map((category) => (
                <React.Fragment key={category._id}>
                  <span>
                    <Input
                      type="number"
                      label="Maximum Price"
                      value={category.max_price}
                      readOnly
                    />
                  </span>
                  <span>
                    <Input
                      type="number"
                      label="Minimum Price"
                      value={category.min_price}
                      readOnly
                    />
                  </span>
                </React.Fragment>
              ))}
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="number"
                label="Price"
                onChange={handleInputChange}
                value={formData.price}
                name="price"
              />
            </span>
            <span>
              <Input
                type="number"
                label="Admin Commission (%)"
                value="2"
                readOnly
              />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="number"
                label="Service Time(hrs)"
                onChange={handleInputChange}
                value={formData.service_time}
                name="service_time"
              />
            </span>
            <span>
              <Input
                type="number"
                label="Year OF Experience (years)"
                onChange={handleInputChange}
                value={formData.yoe}
                name="yoe"
              />
            </span>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="date"
                label="Created At"
                value={new Date().toISOString().split("T")[0]}
              />
            </span>
            <span>
              <Input type="date" label="Updated At" disabled />
            </span>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="bg-[#1A3570]" fullWidth onClick={handleCreate}>
            Create
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default SpNew;
