// import React, { useState } from "react";
// import { Navigate, useNavigate, useLocation } from "react-router-dom";
// // import AttendanceForm from "./WorkerAttendance";
// import ConstructionsProfile from "./ConstructionsProfile";
// import RequirementForm from "./siteEngineer/Requirements";
// import SiteEngineerAttendanceForm from "./siteEngineer/SiteEngineerAttendanceForm";
// import SiteEngProfile from "./siteEngineer/profile/SiteEngineerProfile";
// import { useSiteEngAuth } from "../../../authContext/AuthContextProvider";
// // import HDDForms from "./siteEngineer/HDDForms";

// const ConstructionsDashBoard = () => {
//   const location = useLocation();
//   const { data } = location.state || {};
//   const [activeComponent, setActiveComponent] = useState("profile"); // State to track active component

//   const {siteEngUser,logout}=useSiteEngAuth();

//   const navigate = useNavigate();

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case "profile":
//         return <SiteEngProfile />;
//       case "dailyRequirementsForm":
//         return <RequirementForm />;
//       case "siteEngAttendance":
//         return <SiteEngineerAttendanceForm />;
     

//       default:
//         return (
//           <p className="text-gray-600">Please select an option from above.</p>
//         );
//     }
//   };

//   const handleLogout = () => {
//     const allowMe = window.confirm("Are you sure to logout");
//     if (allowMe) {
//       logout();
//       // navigate("/authentication/logout");
//     }
//   };

//   const getButtonClass = (component) => {
//     return activeComponent === component
//       ? "w-100 px-4 py-2 bg-gray-300 text-black rounded hover:bg-blue-700 transition duration-100"
//       : "w-100 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-100";
//   };

//   return (
//     <div className="p-1 bg-gray-100 min-h-screen">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-14">
//           Hi! {data?.user?.empName}
//         </h1>
//       </div>
//       <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
//         <button
//           onClick={() => setActiveComponent("profile")}
//           className={getButtonClass("profile")}
//         >
//           Profile
//         </button>

//         <button
//           onClick={() => setActiveComponent("dailyRequirementsForm")}
//           className={getButtonClass("upload")}
//         >
//           Daily requirement Forms
//         </button>
//         <button
//           onClick={() => setActiveComponent("siteEngAttendance")}
//           className={getButtonClass("sites-management")}
//         >
//           Attendance
//         </button>
//         <button
//           onClick={() => setActiveComponent("hdd")}
//           className={getButtonClass("hdd")}
//         >
//         HDD
//         </button>

//         <button
//           onClick={() => handleLogout()}
//           className="w-100 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
//         >
//           Logout
//         </button>
//       </div>
//       <div className="bg-slate-500 h-1 my-2"></div>
//       <div className="bg-gray-50 rounded shadow">{renderComponent()}</div>
//     </div>
//   );
// };

// export default ConstructionsDashBoard;
