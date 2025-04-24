import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../../authContext/AuthContextProvider";

const AdminRouteProtector = ({ children }) => {
  // console.log("mounted.")

  const {adminUser} = useAdminAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if(isLoading){
    return < ><div className="w-screen h-screen fixed left-0 top-0 opacity-90 cursor-not-allowed disabled bg-gray-200 text-5xl z-50 flex justify-center items-center">
      Loading...</div></>
  }

  if ( !isLoading && !adminUser) {
    return <Navigate to={"/authentication/officials/login"} />;
  }

  return <>{children}</>;
};

export default AdminRouteProtector;
