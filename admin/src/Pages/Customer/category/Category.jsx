import { useEffect, useState } from "react";
import { getdata } from "../../../services/Apis";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

import { useAuth } from "../../../Context/AuthContext";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getdata("/cat/getAllCat");
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleCategoryClick = (id, name) => {
    setSelectedCategory({ id, name, open: true }); // Update state to open the dialog
  };
  return (
    <div
      className="w-full flex items-center flex-col justify-center relative z-40 -top-20"
      id="service"
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="py-8 px-[10vw] rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-center gap-40">
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
                <div
                  key={index}
                  className="group relative"
                  onClick={() =>
                    handleCategoryClick(category._id, category.service_name)
                  }
                >
                  <img
                    src={category.photo}
                    alt=""
                    className="rounded-full object-cover h-40 w-40 shadow-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity rounded-full">
                    <a
                      // onClick={handleOpen}
                      className="text-white font-bold cursor-pointer hover:bg-transparent"
                    >
                      {category.name}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div>No categories found</div>
            )}
          </div>
        </div>
      )}
      {selectedCategory && (
        <OpenedCat
          id={selectedCategory.id}
          name={selectedCategory.name}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
};

//Opencat component for the subcategories
export const OpenedCat = ({ id, name, onClose }) => {
  const { isLoggedIn } = useAuth();
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();
  console.log("id name:", id, name);
  useEffect(() => {
    // Fetch subcategories when component mounts
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      // Replace the URL with your endpoint to fetch subcategories based on s_id
      const response = await getdata(`/subcat/getSubCatById/${id}`);
      setSubcategories(response.data);
      console.log("response:", response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  console.log("sub:", subcategories);
  // const userID = localStorage.getItem("userID");

  const handleCategoryOpen = (subCategoryId) => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    } else {
      navigate(`/category1/${subCategoryId}`);
    }
  };
  return (
    <>
      <Dialog open={true} onClose={onClose}>
        <DialogHeader></DialogHeader>
        <DialogBody>
          <div className="flex items-center gap-4 justify-center">
            {subcategories.data &&
              subcategories.data.map(({ _id, sub_category_name, photo }) => (
                <figure key={_id}>
                  <img
                    className="h-36 w-36 rounded-full object-cover object-center shadow-lg"
                    src={photo}
                    alt={sub_category_name}
                    onClick={() => handleCategoryOpen(sub_category_name)}
                  />
                  <Typography
                    as="caption"
                    variant="small"
                    className="mt-2 text-center font-normal"
                  >
                    {sub_category_name}
                  </Typography>
                </figure>
              ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose} className="mr-1">
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
