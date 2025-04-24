import { Layout } from "lucide-react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Error from "../Error";
import { AdminAuthProvider } from "../pages/AllPages";
import AdminDashboard from "../pages/admin/AdminDashboard";

const adminRoutes = (
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route path="/pages" element={<>pages</>}>
      <Route path="/admin" element={<>admin pages</>}>
        <Route
          path="/dashboard"
          element={
            <AdminAuthProvider>
              <AdminDashboard></AdminDashboard>
            </AdminAuthProvider>
          }
        ></Route>
      </Route>
    </Route>
  </Route>
);

const adminRouter=createRoutesFromElements(adminRoutes);
const adminBrowserRouter=createBrowserRouter(adminRouter);
