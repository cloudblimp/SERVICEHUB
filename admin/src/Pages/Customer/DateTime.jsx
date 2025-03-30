import React, { useState } from "react";
import { format, addDays } from "date-fns";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const TimeCarousel = ({ times, selectedTime, onSelectTime }) => {
  const handleTimeClick = (time) => {
    onSelectTime(time);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
  };

  return (
    <div className="flex items-center mb-5 w-[90%]">
      <Slider {...settings} className="max-w-[100%] my-auto  h-15 ">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeClick(time)}
            className={`my-2 max-w-[10rem] p-2 rounded-lg shadow-lg bg-white hover:bg-[#1A3570] hover:text-white ${
              selectedTime === time
                ? "bg-[#1A3574] text-red-800 font-bold "
                : ""
            }`}
          >
            {time}
          </button>
        ))}
      </Slider>
    </div>
  );
};

const DateTime = () => {
  const [dateselect, setDate] = useState(new Date());
  const [timeslot, setTimeslot] = useState("");
  const [showError, setShowError] = useState(true);

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    if (date) {
      const currentDate = new Date();
      const maxDate = addDays(currentDate, 7);

      if (date >= currentDate && date <= maxDate) {
        setDate(date);
      } else {
        console.log("Please select a date within the next 7 days.");
      }
    }
  };

  const handleTimeChange = (time) => {
    setTimeslot(time);
  };

  const handleSubmit = () => {
    setShowError(false);

    localStorage.setItem("Date", format(dateselect, "yyyy-MM-dd"));
    localStorage.setItem("Time", timeslot);

    navigate("/cat");
  };

  const times = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ];

  const minDate = format(new Date(), "yyyy-MM-dd");
  const maxDate = format(addDays(new Date(), 7), "yyyy-MM-dd");

  return (
    <div className="flex items-center justify-center h-screen bg-[#1A3570]">
      <div className="mx-auto p-8 bg-[#E5E5E5] rounded-lg shadow-lg max-w-[50%]">
        <h2 className="text-3xl font-bold mb-6">Select Date and Time</h2>

        <div>
          <label htmlFor="date" className="block mb-4 font-semibold">
            Select a Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={format(dateselect, "yyyy-MM-dd")}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
            min={minDate}
            max={maxDate}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-6"
          />

          <label htmlFor="time" className="block mb-4 font-semibold ">
            Select a Time:
          </label>
          <TimeCarousel
            times={times}
            selectedTime={timeslot}
            onSelectTime={handleTimeChange}
          />

          {showError == false ? (
            <></>
          ) : (
            <p className="text-red-500">Please Select the Time</p>
          )}

          <button
            type="button" // Change type to button
            className="mt-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            onClick={handleSubmit} // Call handleSubmit on button click
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
