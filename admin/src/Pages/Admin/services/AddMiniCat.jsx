import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Alert,
} from "@material-tailwind/react";
import { getdata, addMiniCat } from "../../../services/Apis";

const AddMiniCat = () => {
  const [formData, setFormData] = useState({
    mini_cat_name: "",
    nested_cat_id: "",
    min_price: "",
    max_price: "",
    mini_cat_image: null,
    offer_id: null,
  });
  const [nestedcategory, setNestedcategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  useEffect(() => {
    fetchNestedCatData();
  }, []);

  const fetchNestedCatData = async () => {
    try {
      const response = await getdata("/nestedcat/getAllNestCat");
      setNestedcategory(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      mini_cat_image: file,
    });
  };

  const handleCreate = async () => {
    setLoading(true); // Set loading state to true while waiting for response
    setSuccessAlert(false);
    try {
      const response = await addMiniCat(formData);
      console.log("Mini Category Service:", response);
      setLoading(false); // Set loading state to false after receiving response
      setSuccessAlert(true); // Set success alert to true
    } catch (error) {
      console.error("Error adding mini category:", error);
      setLoading(false); // Set loading state to false if there's an error
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
            <span>
              <Input
                type="text"
                name="mini_cat_name"
                label="Mini Category name"
                onChange={handleInputChange}
              />
            </span>
            <select
              name="nested_cat_id"
              onChange={handleInputChange}
              value={formData.nested_cat_id}
            >
              <option value="">Select Service Category</option>
              {Array.isArray(nestedcategory) &&
                nestedcategory.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.nest_category_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-4">
            <span>
              <Input
                type="number"
                name="min_price"
                label="Mininum Price"
                isRequired
                onChange={handleInputChange}
              />
            </span>
            <span>
              <Input
                type="number"
                name="max_price"
                label="Maximum Price"
                onChange={handleInputChange}
              />
            </span>
          </div>
          <div>
            <input
              type="file"
              name="minicategoryImage"
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
          <div className="w-[50%] flex gap-4">
            <span>
              <Input
                type="number"
                name="offer_id"
                label="Offer ID"
                onChange={handleInputChange}
              />
            </span>
            <span>
              <Input
                type="text"
                name="tag"
                label="Tag"
                onChange={handleInputChange}
              />
            </span>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          {loading ? (
            <Button className="bg-[#1A3570]" fullWidth disabled>
              Loading...
            </Button>
          ) : (
            <Button
              className="bg-[#1A3570]"
              fullWidth
              onClick={handleCreate}
              disabled={
                !formData.mini_cat_name ||
                !formData.min_price ||
                !formData.max_price
              }
            >
              Create
            </Button>
          )}
        </CardFooter>
      </Card>
      {successAlert && (
        <Alert type="success" color="green">
          Mini category created successfully!
        </Alert>
      )}
    </>
  );
};

export default AddMiniCat;
