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
import { getdatabyid, editdata } from "../../../services/Apis"; // Use editdata instead of axios

const EditService = ({ data }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await getdatabyid(`/cat/getCatById/${data}`);
        setTitle(response.data.data.service_name);
      } catch (err) {
        setError("Failed to fetch service data.");
        console.error("Error fetching service:", err);
      }
    };
    if (data) fetchServiceData();
  }, [data]);

  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("service_name", title);
    if (image) formData.append("photo", image);

    try {
      await editdata(`/cat/updateCatById/${data}`, formData, "multipart/form-data");
      setSuccess(true);
    } catch (err) {
      setError("Failed to update service.");
      console.error("Error updating service:", err);
    }
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleCreate}>
      <Card className="mx-auto w-fit relative">
        <CardBody className="flex flex-col gap-4">
          <Typography className="text-[#1A3570] font-bold" variant="h6">
            Update Service
          </Typography>
          <div className="flex gap-4">
            <Input
              type="text"
              name="service_name"
              label="Service Category Name"
              required
              value={title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="file"
              name="photo"
              onChange={handleImageUpload}
            />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="bg-[#1A3570]" fullWidth type="submit">
            Update
          </Button>
        </CardFooter>
      </Card>
      {error && (
        <Alert color="red" className="mt-4">
          {error}
        </Alert>
      )}
      {success && (
        <Alert color="green" className="mt-4">
          Service updated successfully!
        </Alert>
      )}
    </form>
  );
};

export default EditService;
// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
// } from "@material-tailwind/react";
// import { editdata, getdatabyid } from "../../../services/Apis";
// import { editService } from "../../../services/editService";
// import axios from "axios";

// const EditService = (props) => {
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null); // Use null for file input
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     // Initialize formData with empty values
//     service_name: "",
//     photo: null,
//   });

//   useEffect(async () => {
//     try {
//       const response = await getdatabyid(`/cat/getCatById/${props.data}`);
//       console.log(response.data.data);
//       setTitle(response.data.data.service_name);
//       setFormData({
//         service_name: response.data.data.service_name,
//         photo: null, // Reset photo in formData to prevent duplication
//       });
//     } catch (error) {
//       console.error("Error updating service:", error);
//       // Handle the error appropriately, such as displaying an error message to the user
//     }
//     // setTitle(props.data.service_name);
//     // setImage(props.data.photo);
//     //
//   }, [props.data]);

//   const handleClose = () => setOpen(false);

//   const handleCreate = async () => {
//     const editService = async (name, file, id) => {
//       const formData = new FormData();
//       formData.append("service_name", name);
//       formData.append("photo", file);

//       try {
//         const data = await axios.put(
//           `http://localhost:1000/cat/updateCatById/${id}`,
//           formData
//         );
//         console.log(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     await editService(title, image, props.data);
//   };

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setTitle(val); // Update the title state
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];

//     setImage(file); // Update the image state
//   };
//   console.log(image);
//   return (
//     <>
//       <Card className="mx-auto w-fit relative">
//         <CardBody className="flex flex-col gap-4">
//           <Typography className="text-[#1A3570] font-bold" variant="h6">
//             Update Service
//           </Typography>

//           <div className="flex gap-4">
//             <Input
//               type="text"
//               name="categoryName"
//               label="Service Category Name"
//               isRequired
//               value={title}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <input
//               type="file"
//               name="categoryImage"
//               onChange={(e) => handleImageUpload(e)}
//             />
//           </div>
//         </CardBody>
//         <CardFooter className="pt-0">
//           <Button
//             className="bg-[#1A3570]"
//             fullWidth
//             onClick={handleCreate}
//             onClose={handleClose}
//           >
//             Update
//           </Button>
//         </CardFooter>
//       </Card>
//     </>
//   );
// };

// export default EditService;
