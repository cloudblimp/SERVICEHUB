import Home from "./Home/Home";
import { Category } from "../category/Category";
import { HowitWorks } from "./HowitWorks";
import AboutUs from "./Aboutus";
import { Footer } from "./Footer";
const VisitorPage = () => {
  return (
    <div className="overflow-hidden w-[100vw] bg-slate-50">
      <Home />
      <Category />
      <HowitWorks />
      <AboutUs />
      <Footer />
    </div>
  );
};
export default VisitorPage;
