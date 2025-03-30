import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Rating,
} from "@material-tailwind/react";
import { getdata } from "../../../services/Apis";

const Reviews = () => {
  const [feedback, setFeedback] = useState([]);
  const [len, setLen] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const spID = localStorage.getItem("userID");

  const fetchData = async () => {
    try {
      const response = await getdata(`/feedback/getByFeedbackID/${spID}`);
      console.log("feedback data:", response.data.data);
      setFeedback(response.data.data);
      // setlen(response.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const heading = ["user name", "service name", "comment", "rating"];

  return (
    <div className="provider">
      <Sidebar />
      <div className="providercontainer bg-gray-100">
        <div class="mx-5 shadow-xl my-[3rem] p-5 bg-white">
          <div className="listTitle ">Reviews</div>
          <Card className="h-full w-full overflow-scroll">
            {feedback.length === 0 ? (
              <div className="p-4">No reviews yet</div>
            ) : (
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
                            {console.log("Row Id", row.user_id.firstName)}
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
                            {/* {row.service_id.mini_cat_id.mini_cat_name} */}
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
                          <Rating
                            value={row.rating}
                            readonly
                            ratedColor="red"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
