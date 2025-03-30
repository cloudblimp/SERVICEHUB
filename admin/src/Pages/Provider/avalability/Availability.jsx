import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import { Button, Typography, Chip } from "@material-tailwind/react";
import { addFunction, getdata, updateFunction } from "../../../services/Apis";

const Availability = () => {
  const [selectedDays, setSelectedDays] = useState({});
  const [showSelectedDays, setShowSelectedDays] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const spid = localStorage.getItem("userID");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getdata(`/spavl/getSpAvl/${spid}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: prevSelectedDays[day] ? [] : ["Morning"],
    }));
  };

  const handleTimeSlotClick = (day, timeSlot) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: prevSelectedDays[day].includes(timeSlot)
        ? prevSelectedDays[day].filter((slot) => slot !== timeSlot)
        : [...prevSelectedDays[day], timeSlot],
    }));
  };

  const handleEditClick = () => {
    setShowSelectedDays(!showSelectedDays);
  };

  const handleUpdateButtonClick = async () => {
    try {
      // Prepare the details object to send to the API
      const sp_id = localStorage.getItem("userID");
      const details = {
        sp_id,
        selectedDays,
      };

      // Fetch existing data from the API
      const existingDataResponse = await getdata(`/spavl/getSpAvl/${sp_id}`);
      const existingData = existingDataResponse.data.data;
      const existingDays = existingData.map((entry) => entry.dayOfWeek);

      // Iterate over selected days
      for (const dayOfWeek in selectedDays) {
        // Check if the selected day is already in the existing data
        if (existingDays.includes(dayOfWeek)) {
          // If day exists, update the data for that day
          const response = await updateFunction(
            details,
            `/spavl/updateSpAvlById/${sp_id}/${dayOfWeek}`
          );

          alert(`${dayOfWeek} availability updated`);
          window.location.reload();
        } else {
          // If day doesn't exist, display an error message
          alert(`No availability found for ${dayOfWeek}`);
        }
      }

      // After updating data, hide the selected days
      setShowSelectedDays(false);
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const handleAddData = async () => {
    let sp_id = localStorage.getItem("userID");
    let details = {
      sp_id,
      selectedDays,
    };

    try {
      for (const dayOfWeek in selectedDays) {
        const response = await addFunction(details, "/spavl/addSpAvl");
        console.log("Response:", response);
        alert(`${dayOfWeek} availability added`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="container bg-blue-gray-50 flex gap-2">
        <div className="mx-10 shadow-xl p-5 w-[50%] h-auto bg-white my-12">
          <Typography variant="h3" color="blue" textGradient>
            Availability
          </Typography>
          <div className="mt-4">
            <Typography variant="h5">
              Select The Days When You Are Available
            </Typography>
            <div className="mt-7">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="mb-4">
                  <Button
                    variant={selectedDays[day] ? "filled" : "outlined"}
                    onClick={() => handleDayClick(day)}
                    className={selectedDays[day] && "bg-green-500"}
                    disabled={loading}
                  >
                    {day} {selectedDays[day] && "✓"}
                  </Button>
                  <br />
                  <div className="flex gap-4 my-5">
                    <span className="ml-4">Time Slot : </span>
                    {["Morning", "Afternoon", "Evening"].map((slot) => (
                      <Chip
                        key={slot}
                        color={
                          selectedDays[day]?.includes(slot) ? "green" : "gray"
                        }
                        value={slot}
                        onClick={() => handleTimeSlotClick(day, slot)}
                        className="mr-2 "
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="blue"
              className="rounded-none mr-4"
              onClick={handleEditClick}
            >
              {showSelectedDays ? "Cancel" : "Edit"}
            </Button>
            {showSelectedDays && (
              <Button
                color="blue"
                className="rounded-none"
                onClick={handleUpdateButtonClick}
              >
                Update
              </Button>
            )}
          </div>
          <Button
            className="my-4 bg-green-900 text-white rounded-none"
            onClick={handleAddData}
          >
            Confirm
          </Button>
        </div>
        <div className="mx-10 shadow-xl p-5 w-[50%] h-auto bg-white my-12">
          <Typography variant="h3" color="blue" textGradient>
            Availability
          </Typography>
          {data.map((d) => (
            <div key={d._id} className="my-2">
              <Typography variant="h4">{d.dayOfWeek}</Typography>
              {d.availableSlots.map((slot) => (
                <Typography
                  variant="h6"
                  key={slot._id}
                  className="rounded-full bg-green-600 text-white w-fit px-2 py-1 m-2"
                >
                  {slot.slot}
                </Typography>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Availability;
