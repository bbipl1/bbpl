import React, { useEffect, useState } from "react";
import { useLocation, } from "react-router-dom";
import { SiteEngAuthContext } from "../../../../../authContext/AuthContextProvider";
import {setCookieWithExpiry,clearCookie} from "../../../../../utility/Cookies";
import {setLocalStorageData,removeLocalStorageData} from "../../../../../utility/LocalStorage";
import useCustomNavigate from "../../../../../utility/Navigate"


const SiteEngAuthProvider = ({ children }) => {
  const [siteEngUser, setSiteEngUser] = useState(null);
  const [isLoading,setIsLoading]=useState(true);
  const location = useLocation();
  const navigateTo=useCustomNavigate();

  useEffect(() => {
    if (location?.state) {
      const data = location?.state?.data;
      const token = data?.token;
      // const userName = data?.user?.name;
      setCookieWithExpiry("token", token);
      // setCookieWithExpiry("userName", userName);
      const user = data?.user;
      setLocalStorageData("user", user);

      setSiteEngUser(user);
      console.log("my data", data);
      setIsLoading(false);
    } 
  }, [location?.state]);

  const logout = () => {
    setSiteEngUser(null);
    removeLocalStorageData("user");
    clearCookie("token");
    // clearCookie("userName");
    return navigateTo("pages/logout",true);
    // return <Navigate to={"/pages/logout"} replace={true} />;
  };

  if ( !isLoading && !siteEngUser) {
    return navigateTo("/authentication/officials/login",true);
    // return <Navigate to={"/authentication/officials/login"}></Navigate>;
  }

  return (
    <div>
      <SiteEngAuthContext.Provider value={{ siteEngUser, logout }}>
        {children}
      </SiteEngAuthContext.Provider>
    </div>
  );
};

export default SiteEngAuthProvider;
