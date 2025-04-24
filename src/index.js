/* custom map css */
import "leaflet/dist/leaflet.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";


// protected routes
import Layout from "./layout/Layout";
import Home from "./layout/Home";
import Error from "./Error.jsx";
import Login from "./authentication/officials/Login.jsx";
import About from "./pages/About.jsx";
// import Services from './pages/Services.jsx';
import MainServices from "./pages/services/MainService.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import RequirementForm from "./pages/officials/constructions/siteEngineer/Requirements.jsx";

// login
import UserForgotPassword from "./authentication/users/UserForgotPassword.jsx";
import UserLogin from "./authentication/users/UserLogin.jsx";
import UserSignUp from "./authentication/users/UserSignUp.jsx";

//officials - start-here
//admin-sections-start
import { AdminAuthProvider } from "./pages/AllPages.jsx";
import { AdminRouteProtector } from "./pages/AllPages.jsx";
// import AdminRouteProtector from "../src/pages/admin/auth/AdminRouteProtector.jsx";
//admin-section-end

//constructions-start-here
//site-eng-start-here
import {
  ForgotPasswordForCons,
  SiteEngAuthProvider,
  SiteEngRouteProtector,
} from "./pages/AllPages.jsx";

//site-eng-end-here

//constructions-end-here
// officials-end-here

import OfficialForgotPasswordForAdm from "./authentication/officials/OfficialForgotPasswordForAdm.jsx";
import OfficialForgotPasswordForDev from "./authentication/officials/OfficialForgotPasswordForAdm.jsx";
import Logout from "./components/admin/Logout.jsx";
import SiteEngDashBoard from "./pages/officials/constructions/siteEngineer/siteEngDashBoard.jsx";
import PrivacyPolicy from "./conditions/Privacy&Policy.jsx";
import TermsAndConditions from "./conditions/Terms&Conditions.jsx";
import Disclaimer from "./conditions/Dislaimers.jsx";
import RefundPolicy from "./conditions/RefundPolicy.jsx";
import CookiesPolicy from "./conditions/CookiesPolicy.jsx";
import CustomMap from "./pages/map/CustomMap.jsx";
import SrcLogin from "./api/SrcLogin.jsx"
// const routerFromelements=

// Non-protected-routes

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      {/* protected-routes */}
      <Route path="" element={<Home />}></Route>
      {/* auth-section-start */}
      <Route path="src/login" element={<SrcLogin/>}></Route>
      <Route path="authentication" element={<Outlet />}>
        <Route path="officials" element={<Outlet />}>
          <Route path="login" element={<Login />}></Route>
          <Route
            path="forgot-password"
            element={<ForgotPasswordForCons />}
          ></Route>
        </Route>

        <Route path="users" element={<Outlet />}>
          <Route path="login" element={<UserLogin />}></Route>
          <Route path="sign-up" element={<UserSignUp />}></Route>
          <Route
            path="forgot-password"
            element={<UserForgotPassword />}
          ></Route>
        </Route>
      </Route>
      {/* auth-section-end */}

      {/* ------------------------------------------------------------------------------------------------------------- */}

      <Route
        path="bbipl-dev-forgot"
        element={<OfficialForgotPasswordForDev />}
      ></Route>
      <Route
        path="bbipl-adm-forgot"
        element={<OfficialForgotPasswordForAdm />}
      ></Route>

      {/* user */}

      {/* admin-route-section-start */}

      <Route path="pages" element={<Outlet />}>
        <Route
          path="admin"
          element={
            <AdminAuthProvider>
              <AdminRouteProtector>
                <Outlet />
              </AdminRouteProtector>
            </AdminAuthProvider>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />}></Route>
        </Route>
        <Route path="developer" element={<Outlet />}>
          <Route path=""></Route>
        </Route>
        <Route path="constructions" element={<Outlet />}>
          <Route
            path="site-engineer"
            element={
              <SiteEngAuthProvider>
                <SiteEngRouteProtector>
                  <Outlet />
                </SiteEngRouteProtector>
              </SiteEngAuthProvider>
            }
          >
            <Route path="dashboard" element={<SiteEngDashBoard />}></Route>
          </Route>
        </Route>
        <Route path="forms" element={<Outlet />}>
          <Route path="requirements-form" element={<RequirementForm />}></Route>
        </Route>
        <Route path="map" element={<CustomMap />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="contact-us" element={<ContactUs />}></Route>
        <Route path="services" element={<MainServices />}></Route>
        <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route
          path="terms-and-conditions"
          element={<TermsAndConditions />}
        ></Route>
        <Route path="disclaimers" element={<Disclaimer />}></Route>
        <Route path="disclaimers" element={<Disclaimer />}></Route>
        <Route path="refund-policy" element={<RefundPolicy />}></Route>
        <Route path="cookies-policy" element={<CookiesPolicy />}></Route>
        <Route path="logout" element={<Logout />}></Route>
      </Route>

      {/* admin-route-section-end */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
