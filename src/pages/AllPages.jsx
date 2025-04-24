import React from "react";
import AdminAuthProvider from "./admin/auth/AdminAuthProvider";
import AdminRouteProtector from "./admin/auth/AdminRouteProtector";

// ------------------------------------------------------------------------------------------------
// admin-section-start-here

// admin-section-end-here
// ------------------------------------------------------------------------------------------
//construction-section-start-here
//site-eng-section-start-here
import ForgotPasswordForCons from "../authentication/officials/constructions/ForgotPasswordForCons";
import SiteEngAuthProvider from "./officials/constructions/siteEngineer/auth/SiteEngAuthProvider";
import SiteEngRouteProtector from "./officials/constructions/siteEngineer/auth/SiteEngRouteProtector";
//site-eng-section-end-here
//construction-section-end-here

export {
    //admin-sections-start-here
    AdminAuthProvider,
    AdminRouteProtector,
    //admin-sections-end-here
    //constructions-sections-start-here
    //site-eng-sections-start-here
    ForgotPasswordForCons,
    SiteEngAuthProvider,
    SiteEngRouteProtector,
    //site-eng-sections-end-here
    //constructions-sections-end-here
};
