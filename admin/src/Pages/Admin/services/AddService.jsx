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

// import React, { useState } from "react";
// import {
//   Button,
//   Alert,
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
// } from "@material-tailwind/react";
// import { addServiceCat } from "../../../services/Apis";

// const AddService = () => {
//   const [formData, setFormData] = useState({
//     service_name: "",
//     photo: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [successAlert, setSuccessAlert] = useState(false);
//   const [error, setError] = useState(null);

//   const handleAddService = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessAlert(false);
//     setError(null);

//     const formDataToSend = new FormData();
//     formDataToSend.append("service_name", formData.service_name);
//     if (formData.photo) formDataToSend.append("photo", formData.photo);

//     try {
//       await addServiceCat(formDataToSend);
//       setLoading(false);
//       setSuccessAlert(true);
//       setFormData({ service_name: "", photo: null }); // Reset form
//     } catch (err) {
//       setError("Failed to add service category.");
//       setLoading(false);
//       console.error("Error adding service category:", err);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       service_name: e.target.value,
//     });
//   };

//   const handleImageUpload = (e) => {
//     setFormData({
//       ...formData,
//       photo: e.target.files[0],
//     });
//   };

//   return (
//     <form onSubmit={handleAddService}>
//       <Card className="mx-auto w-fit relative bg-white">
//         <CardBody className="flex flex-col gap-4">
//           <Typography className="text-[#1A3570] font-bold" variant="h6">
//             Add New Service Category
//           </Typography>
//           <div className="flex gap-4">
//             <Input
//               type="text"
//               name="service_name"
//               label="Service Category Name"
//               required
//               value={formData.service_name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <input
//               type="file"
//               name="photo"
//               onChange={handleImageUpload}
//             />
//           </div>
//         </CardBody>
//         <CardFooter className="pt-0">
//           {loading ? (
//             <Button className="bg-[#1A3570]" fullWidth disabled>
//               Loading...
//             </Button>
//           ) : (
//             <Button className="bg-[#1A3570]" fullWidth type="submit">
//               Create
//             </Button>
//           )}
//         </CardFooter>
//       </Card>
//       {successAlert && (
//         <Alert color="green" className="mt-4">
//           Service category created successfully!
//         </Alert>
//       )}
//       {error && (
//         <Alert color="red" className="mt-4">
//           {error}
//         </Alert>
//       )}
//     </form>
//   );
// };

// export default AddService;