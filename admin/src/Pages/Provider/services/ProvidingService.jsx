import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import ProvidingTable from "./ProvidingTable";
import { Button, Dialog } from "@material-tailwind/react";
import { useNewData } from "../../../Context/NewDataContext";
import SpNew from "./SpNew";
const ProvideService = () => {
  const { open, setOpen } = useNewData(); // Consume the context
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const spid = localStorage.getItem("userID");
  return (
    <div className="provider ">
      <Sidebar />
      <div className="providercontainer bg-gray-200">
        <div className="listcontainer bg-white">
          <div className="flex justify-between items-center mb-[10px]">
            <div className="listTitle">Services Offering</div>
            <Button
              color="green"
              className="flex items-center gap-3"
              size="sm"
              onClick={handleOpen}
            >
              <i className="fa-solid fa-user-plus"></i> Add Service
            </Button>
          </div>
          <ProvidingTable spid={spid} />
        </div>
      </div>
      <Dialog
        size="lg"
        open={open}
        onClose={open}
        className="bg-transparent shadow-none"
      >
        <i
          className="fa-solid fa-xmark fa-xl absolute top-8 right-[3rem] z-20 text-red-500"
          onClick={handleClose}
        />
        <SpNew />
      </Dialog>
    </div>
  );
};
export default ProvideService;
