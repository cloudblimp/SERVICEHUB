import { Button, Card, Typography, Dialog } from "@material-tailwind/react";
import { useNewData } from "../../../Context/NewDataContext";
import SpEdit from "./SpEdit";
import { useState, useEffect } from "react";
import { getdata } from "../../../services/Apis";
const ProvidingTable = ({ spid }) => {
  const { setEOpen, Eopen } = useNewData();
  const handleClose = () => setEOpen(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState([]);

  useEffect(() => {
    fetchData();
  }, [Eopen]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getdata(`/service/getServiceByID/${spid}`);
      setServices(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditClick = (ele) => {
    setEdit(ele);
    setEOpen(true);
  };
  const headData = [
    "mini_category_name",
    "createdAt",
    "updatedAt",
    "price",
    "admin_commission",
    "service_time",
    "sp_earning",
    "option",
  ];

  if (loading) {
    return <div>Loading....</div>;
  } else {
    return (
      <>
        <Card className="h-full w-full overflow-scroll rounded-none">
          <table className="w-full min-w-max table-auto text-center bg-white shadow-md rounded-lg">
            <thead className="bg-blue-gray-50">
              <tr>
                {headData.map((heading, index) => (
                  <th key={index} className="border-b">
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      className="font-semibold leading-none p-4"
                    >
                      {heading}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td className="border-b">
                      {ele.mini_cat_id.mini_cat_name}
                    </td>
                    <td className="border-b">{ele.created_at}</td>
                    <td className="border-b">
                      {ele.updated_at === "" ? "Not updated" : ele.updated_at}
                    </td>
                    <td className="border-b">Rs.{ele.price}</td>
                    <td className="border-b ">{ele.admin_commission}%</td>
                    <td className="border-b ">{ele.service_time} hrs</td>
                    <td className="border-b ">Rs.{ele.sp_earning}</td>
                    <td className="border-b ">
                      <button className="px-3 py-2 m-3 bg-red-400 rounded-full text-white hover:text-red-400 hover:bg-gray-300">
                        Delete
                      </button>
                      <button
                        className="px-3 py-2 m-3 bg-green-400 rounded-full text-white hover:text-green-400 hover:bg-gray-300"
                        onClick={() => handleEditClick(ele)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            ;
          </table>
        </Card>
        <Dialog
          size="lg"
          open={Eopen}
          onClose={handleClose}
          className="bg-transparent shadow-none"
        >
          <i
            className="fa-solid fa-xmark fa-xl absolute top-8 right-[16rem] z-20 text-red-500"
            onClick={handleClose}
          />
          <SpEdit data={edit} />
        </Dialog>
      </>
    );
  }
};
export default ProvidingTable;
