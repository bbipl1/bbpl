import React, { createContext, useContext } from "react";

const AdminAuthContext = createContext();
const SiteEngAuthContext = createContext();

const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
const useSiteEngAuth = () => {
  return useContext(SiteEngAuthContext);
};

const AuthContextProvider = () => {
  return <div>I am a auth provider.</div>;
};

export { AdminAuthContext, useAdminAuth, SiteEngAuthContext, useSiteEngAuth };

export default AuthContextProvider;
