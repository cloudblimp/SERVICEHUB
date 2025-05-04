// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
// } from "@material-tailwind/react";
// import { editdata, getdata } from "../../../services/Apis";

// const EditSubCategory = (props) => {
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null); // Use null for file input
//   const [s_id, setsID] = useState(""); // Use null for file input
//   const [open, setOpen] = useState(false);
//   const [categoryList, setcategoryList] = useState(false);
//   const [formData, setFormData] = useState({
//     sub_category_name: "",
//     photo: null,
//     s_id: "",
//   });

//   useEffect(() => {
//     // Update the state when data prop changes
//     fetchServiceCatData();
//     setTitle(props.props.sub_category_name);
//     setImage(props.props.photo);
//     setsID(props.props.s_id);
//     setFormData({
//       sub_category_name: props.props.sub_category_name,
//       photo: null,
//       s_id: props.props.s_id, // Reset photo in formData to prevent duplication
//     });
//   }, [props.props]);

//   const handleClose = () => setOpen(false);

//   const fetchServiceCatData = async () => {
//     try {
//       const response = await getdata("/cat/getAllCat");
//       setcategoryList(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   console.log("category details;;", categoryList);
//   const handleCreate = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     const formData = new FormData();
//     formData.append("sub_category_name", title);
//     formData.append("photo", image);
//     formData.append("s_id", s_id);

//     try {
//       const response = await editdata(
//         "/cat/updateCatById/" + props.props._id,
//         formData,
//         "multipart/form-data"
//       );

//       console.log("Response from API:", response.data);
//       // Add any additional handling based on the response from the API
//     } catch (error) {
//       console.error("Error updating service:", error);
//       // Handle the error appropriately, such as displaying an error message to the user
//     }
//   };

//   const handleInputChange = (e) => {
//     const { value } = e.target;
//     setTitle(value);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleServiceInputChange = (e) => {
//     const { value } = e.target;
//     console.log("Selected data:", value); // Log the selected data
//     setsID(value);
//   };
//   return (
//     <form action="/cat/addCat" method="post" encType="multipart/form-data">
//       <Card className="mx-auto w-fit relative bg-white">
//         <CardBody className="flex flex-col gap-4">
//           <Typography className="text-[#1A3570] font-bold" variant="h6">
//             Add new Service Category
//           </Typography>

//           <div className="flex gap-4">
//             <Input
//               type="text"
//               name="sub_category_name"
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
//           <div>
//             <select name="s_id" onChange={(e) => handleServiceInputChange(e)}>
//               <option value="">Select Service Category</option>
//               {Array.isArray(categoryList) &&
//                 categoryList.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.service_name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </CardBody>
//         <CardFooter className="pt-0">
//           <Button
//             className="bg-[#1A3570]"
//             fullWidth
//             onClick={handleCreate}
//             onClose={handleClose}
//           >
//             Create
//           </Button>
//         </CardFooter>
//       </Card>
//     </form>
//   );
// };

// export default EditSubCategory;
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
import { editdata, getdata } from "../../../services/Apis";

const EditSubCategory = ({ props: data }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [s_id, setSID] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchServiceCatData();
    if (data) {
      setTitle(data.sub_category_name || "");
      setSID(data.s_id || "");
    }
  }, [data]);

  const fetchServiceCatData = async () => {
    try {
      const response = await getdata("/cat/getAllCat");
      setCategoryList(response.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("sub_category_name", title);
    formData.append("s_id", s_id);
    if (image) formData.append("photo", image);

    try {
      await editdata(`/subcat/updateSubCatById/${data._id}`, formData, "multipart/form-data");
      setSuccess(true);
    } catch (err) {
      setError("Failed to update sub category.");
      console.error("Error updating sub category:", err);
    }
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleServiceInputChange = (e) => {
    setSID(e.target.value);
  };

  return (
    <form onSubmit={handleCreate}>
      <Card className="mx-auto w-fit relative bg-white">
        <CardBody className="flex flex-col gap-4">
          <Typography className="text-[#1A3570] font-bold" variant="h6">
            Update Sub Service Category
          </Typography>
          <div className="flex gap-4">
            <Input
              type="text"
              name="sub_category_name"
              label="Sub Service Category Name"
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
          <div>
            <select
              name="s_id"
              onChange={handleServiceInputChange}
              value={s_id}
              required
            >
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
          Sub category updated successfully!
        </Alert>
      )}
    </form>
  );
};

export default EditSubCategory;