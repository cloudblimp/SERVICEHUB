import { CarouselDefault } from "./Carasoul";
import Navbar from "../../../../components/Customer/Navbar/Navbar";
const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden w-screen h-screen relative " id="home">
        <div className="absolute z-30">
          <Navbar />
        </div>
        <CarouselDefault />
        <div className="absolute top-0 left-0 w-screen h-screen bg-[#1F1F20]/40 z-20"></div>
        <div className=" absolute z-[99] leading-none text-right right-[10%] top-[40%]">
          <h1 className="text-[#FCA311] font-black font-serif  text-[5rem] lg:text-[6rem]">
            Service Hub
          </h1>
          <h3 className="  text-white text-[1rem] lg:text-[1.5rem]">
            Your Service,Your Choice,Your Way
          </h3>
        </div>
      </div>
    </>
  );
};
export default Home;
