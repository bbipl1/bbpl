import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminAuthContext } from "../../../authContext/AuthContextProvider";
import {setCookieWithExpiry,clearCookie} from "../../../utility/Cookies";
import {setLocalStorageData,removeLocalStorageData} from "../../../utility/LocalStorage";
import useCustomNavigate from "../../../utility/Navigate";

const AdminAuthProvider = ({ children }) => {
  const navigateTo=useCustomNavigate();
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("adminUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing adminUser from localStorage:", error);
      return null; // Fallback to null if parsing fails
    }
  });

  const location = useLocation();

  useEffect(() => {
    if (location?.state?.data) {
      setAdminUser(location.state.data);
      const data = location?.state?.data;
      const user = data?.user;
      // const userName=data?.user?.name;
      const token = data?.token;
      setCookieWithExpiry("token", token);
      // setLocalStorageData("user",user)

      setLocalStorageData("adminUser", user);
    }
  }, [location]);

  const adminLogout = () => {
    
    setAdminUser(null);
    removeLocalStorageData("adminUser");
    clearCookie("token");
    return navigateTo("/pages/logout",true);
    // return navigate("/pages/logout",{replace:true})
    // return <Navigate to={"/pages/logout"} replace={true} />;
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
