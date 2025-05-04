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

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
//   Alert,
// } from "@material-tailwind/react";
// import { addSubCat, getdata } from "../../../services/Apis";

// const AddSubCategory = () => {
//   const [formData, setFormData] = useState({
//     sub_category_name: "",
//     photo: null,
//     s_id: "",
//   });
//   const [categoryList, setCategoryList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successAlert, setSuccessAlert] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchSubCatData();
//   }, []);

//   const fetchSubCatData = async () => {
//     try {
//       const response = await getdata("/cat/getAllCat");
//       setCategoryList(response.data.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   const handleAddService = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessAlert(false);
//     setError(null);

//     const formDataToSend = new FormData();
//     formDataToSend.append("sub_category_name", formData.sub_category_name);
//     formDataToSend.append("s_id", formData.s_id);
//     if (formData.photo) formDataToSend.append("photo", formData.photo);

//     try {
//       await addSubCat(formDataToSend, "/subcat/addSubCat");
//       setLoading(false);
//       setSuccessAlert(true);
//       setFormData({ sub_category_name: "", photo: null, s_id: "" });
//     } catch (err) {
//       setError("Failed to add sub category.");
//       setLoading(false);
//       console.error("Error adding sub category:", err);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       sub_category_name: e.target.value,
//     });
//   };

//   const handleServiceInputChange = (e) => {
//     setFormData({
//       ...formData,
//       s_id: e.target.value,
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
//             Add New Sub Service Category
//           </Typography>
//           <div className="flex gap-4">
//             <Input
//               type="text"
//               name="sub_category_name"
//               label="Sub Service Category Name"
//               required
//               value={formData.sub_category_name}
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
//           <div>
//             <select
//               name="s_id"
//               onChange={handleServiceInputChange}
//               value={formData.s_id}
//               required
//             >
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
//           Sub service category created successfully!
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

// export default AddSubCategory;