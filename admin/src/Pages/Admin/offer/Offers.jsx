import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import { Button, Dialog } from "@material-tailwind/react";
import { OfferHead, OfferRows } from "../../../Data/Admin/Database";
import { useState, useEffect } from "react";
import OfferAdd from "./OfferAdd";
import { useNewData } from "../../../Context/NewDataContext";
import Offertable from "./Offertable";
import { getdata } from "../../../services/Apis";
const Offer = () => {
  const { newData, open, setOpen } = useNewData(); // Consume the context
  // const updatedServiceTableRows = [...OfferRows, ...newData];
  const [details, setDetails] = useState([]);
  const [heading, setHeading] = useState();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getdata("/offer/getAllOffer");
      console.log("respnse", response);
      const headKeys = Object.keys(response.data.data[0]).filter(
        (key) => key !== "__v"
      );
      setHeading(headKeys);
      setDetails(response.data.data);
      console.log("heading:", headKeys);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="provider">
      <Sidebar />
      <div className="w-[85%] bg-slate-50">
        <div class="mx-10 shadow-xl my-10 p-5 bg-white">
          <div className="flex items-center justify-between heading mb-5 ">
            <div className="listTitle ">Offer Details</div>
            <Button
              color="green"
              className="flex items-center gap-3"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <i class="fa-solid fa-user-plus"></i> Add Offer
            </Button>
          </div>
          <Offertable heading={heading} details={details} />
        </div>
      </div>
      <Dialog
        size="lg"
        open={open}
        onClose={open}
        className="bg-transparent shadow-none"
      >
        <is
          className="fa-solid fa-xmark fa-xl absolute top-8 right-[16rem] z-20 text-red-500"
          onClick={() => handleClose()}
        />
        <OfferAdd />
      </Dialog>
    </div>
  );
};
export default Offer;
