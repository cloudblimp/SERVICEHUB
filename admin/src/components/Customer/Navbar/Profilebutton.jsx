import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { useAuth } from "../../../Context/AuthContext";

export default function ProfileButton() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const handleOrders = () => {
    navigate("/bookingdetails");
  };
  const handlelogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <Menu>
      <MenuHandler>
        <IconButton className="rounded-full bg-white " size="lg">
          <i class="fa-solid fa-user fa-xl" style={{ color: "#FFD43B" }}></i>
        </IconButton>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={() => handleProfile()}>Profile</MenuItem>
        <MenuItem onClick={() => handleOrders()}>My Orders</MenuItem>
        <MenuItem onClick={() => handlelogout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
