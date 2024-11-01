import React from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [authenticationData, setIsAuthenticationData] = React.useState(
    token || ""
  );

  const saveAuthenticationData = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setIsAuthenticationData(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticationData("");
  };

  return (
    <AuthContext.Provider
      value={{ authenticationData, saveAuthenticationData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
