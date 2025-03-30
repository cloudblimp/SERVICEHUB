import React, { useState } from "react";
import {
  Button,
  Alert,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { addServiceCat } from "../../../services/Apis";

const AddService = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  //   const [open, setOpen] = useState(true);

  //   const handleClose = () => setOpen(false);

  const handleAddService = async () => {
    setLoading(true); // Set loading state to true while waiting for response
    setSuccessAlert(false);
    try {
      const response = await addServiceCat(formData);
      // Handle successful response
      console.log("Add Service:", response);
      setLoading(false); // Set loading state to false after receiving response
      setSuccessAlert(true);
    } catch (error) {
      // Handle error
      console.error("Error adding service category:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      service_name: value,
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
                value={formData.categoryName}
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

export default AddService;
