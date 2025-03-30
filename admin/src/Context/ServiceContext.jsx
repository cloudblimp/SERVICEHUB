import React, { createContext, useContext, useState } from "react";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  //Category1
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [success, setSuccess] = useState(false);
  const AddService = (service) => {
    console.log("Adding service:", service);
    setSelectedProvider((prevServices) => [...prevServices, service]);
    console.log("Updated services:", services);
  };

  const value = {
    services,
    AddService,
    selectedCategory,
    setSelectedCategory,
    openAccordion,
    setOpenAccordion,
    selectedService,
    setSelectedService,
    selectedProvider,
    setSelectedProvider,

    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    success,
    setSuccess,
  };
  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export const useService = () => useContext(ServiceContext);
