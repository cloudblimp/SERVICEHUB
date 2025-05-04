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
// import { addFunction, getdata } from "../../../services/Apis";

// const AddNestedCategory = () => {
//   const [formData, setFormData] = useState({
//     nest_category_name: "",
//     sub_cat_id: "",
//   });
//   const [open, setOpen] = useState(false);
//   const [nestedcategoryList, setNestedcategoryList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successAlert, setSuccessAlert] = useState(false);
//   useEffect(() => {
//     fetchSubCatData();
//   }, []);

//   const fetchSubCatData = async () => {
//     try {
//       const response = await getdata("/subcat/getAllSubCat");
//       console.log("Respnse", response.data.data);
//       setNestedcategoryList(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleAddService = async () => {
//     setLoading(true); // Set loading state to true while waiting for response
//     setSuccessAlert(false);
//     try {
//       const response = await addFunction(formData, "/nestedcat/addNestCat");

//       setLoading(false); // Set loading state to false after receiving response
//       setSuccessAlert(true);
//       handleClose();
//     } catch (error) {
//       console.error("Error adding service category:", error);
//       setLoading(false);
//     }
//   };

//   const handleClose = () => setOpen(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <>
//       <form>
//         <Card className="mx-auto w-fit relative bg-white p-[1rem]">
//           <CardBody className="flex flex-col gap-4">
//             <Typography className="text-[#1A3570] font-bold" variant="h6">
//               Add new Service Category
//             </Typography>

//             <div className="flex gap-4">
//               <Input
//                 type="text"
//                 name="nest_category_name"
//                 label="Service Category Name"
//                 isRequired
//                 value={formData.nest_category_name}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <select
//                 name="sub_cat_id"
//                 onChange={handleInputChange}
//                 value={formData.sub_cat_id}
//               >
//                 <option value="">Select Service Category</option>
//                 {Array.isArray(nestedcategoryList) &&
//                 nestedcategoryList.length > 0 ? (
//                   nestedcategoryList.map((category) => (
//                     <option key={category._id} value={category._id}>
//                       {category.sub_category_name}
//                     </option>
//                   ))
//                 ) : (
//                   <option value="">Loading...</option>
//                 )}
//               </select>
//             </div>
//           </CardBody>
//           <CardFooter className="pt-0">
//             {loading ? (
//               <Button className="bg-[#1A3570]" fullWidth disabled>
//                 Loading...
//               </Button>
//             ) : (
//               <Button
//                 className="bg-[#1A3570]"
//                 fullWidth
//                 onClick={handleAddService}
//                 onClose={handleClose}
//               >
//                 Create
//               </Button>
//             )}
//           </CardFooter>
//         </Card>
//         {successAlert && (
//           <Alert type="success" color="green">
//             Nested category created successfully!
//           </Alert>
//         )}
//       </form>
//     </>
//   );
// };

// export default AddNestedCategory;
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
import { addFunction, getdata } from "../../../services/Apis";

const AddNestedService = () => {
  const [formData, setFormData] = useState({
    nest_category_name: "",
    sub_cat_id: "",
  });
  const [nestedcategoryList, setNestedcategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubCatData();
  }, []);

  const fetchSubCatData = async () => {
    try {
      const response = await getdata("/subcat/getAllSubCat");
      setNestedcategoryList(response.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessAlert(false);
    setError(null);

    try {
      await addFunction(formData, "/nestedcat/addNestCat");
      setLoading(false);
      setSuccessAlert(true);
      setFormData({ nest_category_name: "", sub_cat_id: "" });
    } catch (err) {
      setError("Failed to add nested category.");
      setLoading(false);
      console.error("Error adding nested category:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleAddService}>
      <Card className="mx-auto w-fit relative bg-white p-[1rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography className="text-[#1A3570] font-bold" variant="h6">
            Add New Nested Service Category
          </Typography>
          <div className="flex gap-4">
            <Input
              type="text"
              name="nest_category_name"
              label="Nested Service Category Name"
              required
              value={formData.nest_category_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <select
              name="sub_cat_id"
              onChange={handleInputChange}
              value={formData.sub_cat_id}
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
          {loading ? (
            <Button className="bg-[#1A3570]" fullWidth disabled>
              Loading...
            </Button>
          ) : (
            <Button className="bg-[#1A3570]" fullWidth type="submit">
              Create
            </Button>
          )}
        </CardFooter>
      </Card>
      {successAlert && (
        <Alert color="green" className="mt-4">
          Nested category created successfully!
        </Alert>
      )}
      {error && (
        <Alert color="red" className="mt-4">
          {error}
        </Alert>
      )}
    </form>
  );
};

export default AddNestedService;