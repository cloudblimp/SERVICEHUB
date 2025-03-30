import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (usertype) => {
    setuser(usertype);
    console.log("User logged in:", usertype);
  };

  const logout = () => {
    return setuser(null);
  };

  const value = { user, login, logout, isLoggedIn, setIsLoggedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
