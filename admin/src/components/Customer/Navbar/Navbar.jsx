import { NavLink } from "react-router-dom";
import ProfileButton from "./Profilebutton";
import logo from "../../../images/whitelogo.png";
import { Button } from "@material-tailwind/react";
import { useAuth } from "../../../Context/AuthContext";
const Navbar = ({ color }) => {
  const { isLoggedIn } = useAuth();
  const scrollToContact = (elem) => {
    const contactSection = document.getElementById(elem);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="w-screen flex justify-between px-10 py-0 items-center h-20 text-white bg-[#0073ff] sticky top-0 opacity-full"
      style={{ backgroundColor: { color } }}
    >
      <div className="">
        <img src={logo} alt="" className="w-[175px] mt-2"></img>
      </div>
      <div className="">
        <ul className="hidden md:flex items-center justify-evenly gap-20 text-md">
          <NavLink to="/">
            <li
              onClick={() => scrollToContact("/")}
              className="hover:text-[#E5E5E5] cursor-pointer"
            >
              Home
            </li>
          </NavLink>

          <li
            onClick={() => scrollToContact("about")}
            className="hover:text-[#E5E5E5] cursor-pointer"
          >
            About Us
          </li>

          <li
            onClick={() => scrollToContact("service")}
            className="hover:text-[#E5E5E5] cursor-pointer"
          >
            Service
          </li>
        </ul>
      </div>
      <div className="">
        {isLoggedIn ? (
          <ProfileButton />
        ) : (
          <NavLink to="/login">
            <Button className="bg-[#FCA311] rounded-md text-white hover:bg-[#FCA311]/80">
              Login
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
};
export default Navbar;
