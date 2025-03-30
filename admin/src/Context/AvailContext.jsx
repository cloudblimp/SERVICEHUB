import React, { createContext, useContext, useState } from "react";

const AvailabilityContext = createContext();

export const useAvailability = () => {
  return useContext(AvailabilityContext);
};

export const AvailabilityProvider = ({ children }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  return (
    <AvailabilityContext.Provider value={{ selectedDays, toggleDay }}>
      {children}
    </AvailabilityContext.Provider>
  );
};
