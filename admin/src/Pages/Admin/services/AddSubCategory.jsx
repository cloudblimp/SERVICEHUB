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
import { addSubCat, getdata } from "../../../services/Apis";

const AddSubCategory = () => {
  const [formData, setFormData] = useState({
    sub_category_name: "",
    photo: null,
    s_id: "",
  });
  const [open, setOpen] = useState(false);
  const [categoryList, setcategoryList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    fetchSubCatData();
  }, []);

  const fetchSubCatData = async () => {
    try {
      const response = await getdata("/cat/getAllCat");
      setcategoryList(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("category details;;", categoryList);
  const handleAddService = async () => {
    setLoading(true); // Set loading state to true while waiting for response
    setSuccessAlert(false);
    try {
      const response = await addSubCat(formData, "/subcat/addSubCat");
      // Handle successful response
      console.log("Sub Cta Service:", response);
      setLoading(false); // Set loading state to false after receiving response
      setSuccessAlert(true);
    } catch (error) {
      // Handle error
      console.error("Error adding service category:", error);
      setLoading(false);
    }
  };
  const handleClose = () => setOpen(false);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      sub_category_name: value,
    });
  };
  const handleServiceInputChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      s_id: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      photo: file,
    });
  };

  return (
    <>
      <form action="/cat/addCat" method="post" encType="multipart/form-data">
        <Card className="mx-auto w-fit relative bg-white">
          <CardBody className="flex flex-col gap-4">
            <Typography className="text-[#1A3570] font-bold" variant="h6">
              Add new Service Category
            </Typography>

            <div className="flex gap-4">
              <Input
                type="text"
                name="categoryName"
                label="Service Category Name"
                isRequired
                value={formData.sub_category_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="file"
                name="categoryImage"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>
            <div>
              <select name="s_id" onChange={handleServiceInputChange}>
                <option value="">Select Service Category</option>
                {Array.isArray(categoryList) &&
                  categoryList.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.service_name}
                    </option>
                  ))}
              </select>
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
                onClick={handleAddService}
                onClose={handleClose}
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
      </form>
    </>
  );
};

export default AddSubCategory;
