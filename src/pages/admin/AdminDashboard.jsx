import React, { useState } from "react";
import Details from "./Details"; // Import the Details component
import Upload from "./UploadFiles"; // Import the Upload component
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import ContactUsMessages from "./ContactUsMessages";
import FormRequirementDetails from "./FormRequirementDetails";
import SiteManagement from "./sitesManagement/SitesUpdateManagement";
import ShowUserAttendance from "./ShowUserAttendance";
import DailyProgressReport from "./DailyProgressReport";
import ShowHDDForms from "./officialUsers/construction/siteEng/hdd/ShowHDDForm";
import { useAdminAuth } from "../../authContext/AuthContextProvider";
import HDDReport from "./officialUsers/construction/siteEng/hdd/HDDReport";

const AdminDashboard = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [activeComponent, setActiveComponent] = useState("details"); // State to track active component
  const [showMenu, setShowMenu] = useState("hidden");
  const [isHddOpen, setIsHddOpen] = useState(false);

  const { adminUser, adminLogout } = useAdminAuth();

  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "details":
        return <Details />;
      case "upload":
        return <Upload />;
      case "contactUsMessages":
        return <ContactUsMessages />;
      case "form-requirements":
        return <FormRequirementDetails />;
      case "sites-management":
        return <SiteManagement />;
      case "showUserAttendance":
        return <ShowUserAttendance />;
      case "dailyProgressReport":
        return <DailyProgressReport />;
      case "filledForm":
        return <ShowHDDForms />;
      case "hddReport":
        return <HDDReport />;
      default:
        return (
          <p className="text-gray-600">Please select an option from above.</p>
        );
    }
  };

  const handleLogout = () => {
    const allowMe = window.confirm("Are you sure to logout?");
    if (allowMe) {
      // navigate("/");
      adminLogout();
    }
  };

  const getButtonClass = (component) => {
    return activeComponent === component
      ? "w-full  px-4 py-2 bg-blue-300 text-white rounded-none hover:bg-blue-400 hover:border-1 transition duration-100 cursor-pointer"
      : "w-full  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-100 cursor-pointer";
  };

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="flex justify-between">
        <div className="text-3xl font-bold text-gray-800 mb-6 ml-2">
          Hi! {data?.user?.name}
        </div>
        {showMenu === "hidden" && window.innerWidth <= 600 && (
          <div
            onClick={() => {
              setShowMenu("flex");
            }}
            className="cursor-pointer mr-4 bg-blue-600 hover:bg-blue-800 flex items-center px-4 rounded-md text-white"
          >
            <p className="text-2xl font-bold">Menu</p>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          setShowMenu("hidden");
        }}
        className={`fixed flex flex-col gap-1 transition-all duration-1000 ease-in-out 
          ${showMenu !== "hidden" ? "w-3/4" : "w-0 -translate-x-[350%]"} 
          lg:w-full lg:translate-x-0 md:translate-x-0 lg:pb-12 h-screen px-4 top-24 pt-4 
          bg-gray-100 lg:grid lg:grid-cols-5 lg:h-16`}
      >
        <button
          onClick={() => setActiveComponent("details")}
          className={getButtonClass("details")}
        >
          Show Employee
        </button>

        <button
          onClick={() => setActiveComponent("upload")}
          className={getButtonClass("upload")}
        >
          Add Employee
        </button>
        <button
          onClick={() => setActiveComponent("sites-management")}
          className={getButtonClass("sites-management")}
        >
          Add Site
        </button>
        <button
          onClick={() => setActiveComponent("form-requirements")}
          className={getButtonClass("form-requirements")}
        >
          Requirements Form
        </button>
        <button
          onClick={() => setActiveComponent("contactUsMessages")}
          className={getButtonClass("contactUsMessages")}
        >
          Contact Us
        </button>
        <button
          onClick={() => setActiveComponent("showUserAttendance")}
          className={getButtonClass("showUserAttendance")}
        >
          Attendance
        </button>
        <button
          onClick={() => setActiveComponent("dailyProgressReport")}
          className={getButtonClass("dailyProgressReport")}
        >
          Daily Report
        </button>
        <div className="w-full relative">
          <button
            onClick={() => {
              // setActiveComponent("hdd");
              setIsHddOpen(!isHddOpen);
            }}
            className={getButtonClass("hdd")}
          >
            HDD
          </button>
          {isHddOpen && (
            <ul className="absolute left-0 w-full bg-blue-500">
              <li
                onClick={() => {
                  setActiveComponent("filledForm");
                  setIsHddOpen(false);
                }}
                className={getButtonClass("hddFormsReport")}
              >
                Filled form
              </li>
              <li
                onClick={() => {
                  setActiveComponent("hddReport");
                  setIsHddOpen(false);
                }}
                className={getButtonClass("hddFormsReport")}
              >
                Report
              </li>
            </ul>
          )}
        </div>

        <button
          onClick={() => handleLogout()}
          className="w-100 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
      <div className="bg-slate-500 h-1 my-12"></div>
      <div className="bg-gray-50 rounded shadow">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
