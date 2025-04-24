import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSiteEngAuth } from "../../../../../authContext/AuthContextProvider";

const SiteEngRouteProtector = ({ children }) => {
  const { siteEngUser } = useSiteEngAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Wait for authentication check on mount
  useEffect(() => {
    setIsAuthChecked(true);
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (!siteEngUser) {
    console.log("User not authenticated, navigating to login");
    return <Navigate to="/authentication/officials/login" replace />;
  }

  console.log("User authenticated:", siteEngUser);
  return <>{children}</>;
};

export default SiteEngRouteProtector;
