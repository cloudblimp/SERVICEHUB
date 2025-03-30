// NewDataContext.js
import React, { createContext, useState, useContext } from "react";

const NewDataContext = createContext();

export const NewDataProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [Eopen, setEOpen] = useState(false);

  return (
    <NewDataContext.Provider
      value={{
        open,
        setOpen,
        Eopen,
        setEOpen,
      }}
    >
      {children}
    </NewDataContext.Provider>
  );
};

export const useNewData = () => useContext(NewDataContext);
