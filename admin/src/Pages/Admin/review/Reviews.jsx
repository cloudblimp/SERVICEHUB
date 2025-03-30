import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Rating,
} from "@material-tailwind/react";

import { useState, useEffect } from "react";
import { getdata } from "../../../services/Apis";
const Review = () => {
  const [feedback, setfeedback] = useState([]);
  const [len, setlen] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getdata(`/feedback/getAllFeedback`);
      console.log("resp", response.data.data);
      setfeedback(response.data.data);
      // setlen(response.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const heading = ["user name", "sp name", "service name", "comment", "rating"];
  return (
    <div className="provider">
      <Sidebar />
      <div className="providercontainer bg-gray-100">
        <div className="mx-5 shadow-xl my-[3rem] p-5 bg-white">
          <div className="listTitle ">Reviews</div>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {heading.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {feedback.map((row, index) => {
                  const isLast = index === feedback.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={row._id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.user_id.firstName}
                          {""} {row.user_id.lastName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.service_id.sp_id.firstName}
                          {""} {row.service_id.sp_id.lastName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.service_id.mini_cat_id.mini_cat_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.comment}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Rating value={row.rating} readonly ratedColor="red" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Review;
