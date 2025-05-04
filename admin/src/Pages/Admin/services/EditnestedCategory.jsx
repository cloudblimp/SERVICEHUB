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
// // Import statements...

// const EditNestedCategory = (props) => {
//   const [title, setTitle] = useState("");
//   const [sub_cat_id, setSubCatID] = useState("");
//   const [open, setOpen] = useState(false);
//   const [nestedcategoryList, setNestedcategoryList] = useState([]);

//   useEffect(() => {
//     fetchServiceCatData();
//   }, []);

//   const handleClose = () => setOpen(false);

//   const fetchServiceCatData = async () => {
//     try {
//       const response = await getdata("/nestedcat/getAllNestCat");
//       setNestedcategoryList(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("nest_category_name", title);
//     formData.append("sub_cat_id", sub_cat_id);

//     try {
//       const response = await editdata(
//         "/nestedcat/updateNestCatById/" + props.props._id,
//         formData,
//         "application/json"
//       );

//       console.log("Response from API:", response.data);
//     } catch (error) {
//       console.error("Error updating service:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { value } = e.target;
//     setTitle(value);
//   };

//   const handleServiceInputChange = (e) => {
//     const { value } = e.target;
//     setSubCatID(value);
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
//             <select
//               name="sub_cat_id"
//               onChange={handleServiceInputChange}
//               value={sub_cat_id}
//             >
//               <option value="">Select Service Category</option>
//               {Array.isArray(nestedcategoryList) &&
//               nestedcategoryList.length > 0 ? (
//                 nestedcategoryList.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.sub_category_name}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">Loading...</option>
//               )}
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

// export default EditNestedCategory;
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

const EditNestedCategory = ({ data }) => {
  const [title, setTitle] = useState("");
  const [sub_cat_id, setSubCatID] = useState("");
  const [nestedcategoryList, setNestedcategoryList] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchServiceCatData();
    if (data) {
      setTitle(data.nest_category_name || "");
      setSubCatID(data.sub_cat_id || "");
    }
  }, [data]);

  const fetchServiceCatData = async () => {
    try {
      const response = await getdata("/subcat/getAllSubCat"); // Fetch subcategories, not nested categories
      setNestedcategoryList(response.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("nest_category_name", title);
    formData.append("sub_cat_id", sub_cat_id);

    try {
      await editdata(`/nestedcat/updateNestCatById/${data._id}`, formData, "application/json");
      setSuccess(true);
    } catch (err) {
      setError("Failed to update nested category.");
      console.error("Error updating nested category:", err);
    }
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleServiceInputChange = (e) => {
    setSubCatID(e.target.value);
  };

  return (
    <form onSubmit={handleCreate}>
      <Card className="mx-auto w-fit relative bg-white">
        <CardBody className="flex flex-col gap-4">
          <Typography className="text-[#1A3570] font-bold" variant="h6">
            Update Nested Service Category
          </Typography>
          <div className="flex gap-4">
            <Input
              type="text"
              name="nest_category_name"
              label="Nested Service Category Name"
              required
              value={title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <select
              name="sub_cat_id"
              onChange={handleServiceInputChange}
              value={sub_cat_id}
              required
            >
              <option value="">Select Sub Service Category</option>
              {Array.isArray(nestedcategoryList) && nestedcategoryList.length > 0 ? (
                nestedcategoryList.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.sub_category_name}
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
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
          Nested category updated successfully!
        </Alert>
      )}
    </form>
  );
};

export default EditNestedCategory;