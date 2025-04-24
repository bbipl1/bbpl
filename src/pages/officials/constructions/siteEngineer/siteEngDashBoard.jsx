import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import RequirementForm from "./Requirements";
import SiteEngineerAttendanceForm from "./SiteEngineerAttendanceForm";
import SiteEngProfile from "./profile/SiteEngineerProfile";
import ManageWorker from "./profile/ManageWorkers";
import DailyProgress from "./dailyProgressReport/DailyProgress";
import UpdateForm from "./dailyProgressReport/UpdateForm";
import PaymentScreenShot from "./dailyProgressReport/PaymentScreenShot";
import WorkProgress from "./dailyProgressReport/WorkProgress";
import WorkProgressVideo from "./dailyProgressReport/WorkProgressVideo";
import ShowAllReports from "./showAllReports/ShowAllReports";
import HDDForms from "./hddforms/HDDForms";
import UpdateDailyProgressReport from "./dailyProgressReport/UpdateProgressForm";
import ShowAllForms from "./hddforms/ShowAllForms";
import { useSiteEngAuth } from "../../../../authContext/AuthContextProvider";
// import UploadPaymentReceipt from "./hddforms/UploadPaymentReceipt";
// import UploadWorkProgressPhotoOrVideo from "./hddforms/UploadWorkProgressPhotoOrVideo";

const SiteEngDashBoard = () => {
  const {siteEngUser,logout}=useSiteEngAuth();
  const location = useLocation();
  const { data } = location?.state || {};
  // console.log("data is", data);
  const [activeComponent, setActiveComponent] = useState("profile"); // State to track active component
  const [isOpen, setIsOpen] = useState(false);
  const [HDDOpen, setHDDOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  // const navigation = useNavigate();
  useEffect(() => {
    if (!data) {
      // console.log("login");
      // navigate("/authentication/officials/officials-login");
    } else {
      // console.log("not login");
    }
  }, [data, navigate]);

  const renderComponent = () => {
    // setIsOpen(false);
    switch (activeComponent) {
      case "profile":
        return <SiteEngProfile siteEngineer={data?.user} />;
      case "RequirementsForm":
        return <RequirementForm user={data?.user} />;
      case "Fill-Form":
        return <DailyProgress user={data?.user} />;
      case "Update-Form":
        return <UpdateDailyProgressReport user={data?.user} />;
      case "Upload-Payment-Screenshot":
        return <PaymentScreenShot user={data?.user} />;
      case "Upload-Work-Progress-photo":
        return <WorkProgress user={data?.user} />;
      case "Upload-Work-Progress-video":
        return <WorkProgressVideo user={data?.user} />;
      case "Show-all-reports":
        return <ShowAllReports user={data?.user} />;
      case "siteEngAttendance":
        return <SiteEngineerAttendanceForm siteEng={data?.user} />;
      case "workers":
        return <ManageWorker siteEngineerId={data?.user?.id} />;
      case "Fill-HDD-Form":
        return <HDDForms siteEngineerId={data?.user} />;
      case "Update-HDD-Form":
        return <UpdateForm siteEngineerId={data?.user} />;
      // case "Upload-payment-receipt":
      //   return <UploadPaymentReceipt siteEngineerId={data?.user} />;
      // case "upload-work-progress-photo/video":
      //   return <UploadWorkProgressPhotoOrVideo siteEngineerId={data?.user} />;
      case "show-all-forms":
        return <ShowAllForms siteEngineerId={data?.user} />;

      default:
        return (
          <p className="text-gray-600">Please select an option from above.</p>
        );
    }
  };

  const handleLogout = () => {
    const allowMe = window.confirm("Are you sure to logout?");
    if (allowMe) {
      logout();
      // navigate("/authentication/logout");
    }
  };

  const getButtonClass = (component) => {
    return activeComponent === component
      ? "w-100 px-4 py-2 bg-gray-300 text-black rounded hover:bg-blue-700 transition duration-100"
      : "w-100 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-100";
  };



  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-14">
          Hi! {data?.user?.name}
        </h1>
      </div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <button
          onClick={() => setActiveComponent("profile")}
          className={getButtonClass("profiles")}
        >
          Profile
        </button>

        <button
          onClick={() => setActiveComponent("workers")}
          className={getButtonClass("upload")}
        >
          Manpower
        </button>

        {/* <button
          onClick={() => setActiveComponent("RequirementsForm")}
          className={getButtonClass("upload")}
        >
          Requirement Forms
        </button> */}

        <div className="relative w-100 bg-blue-500 hover:bg-blue-600">
          <button
            className={`w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ${
              isOpen ? "rounded-b-none" : ""
            }`}
            onClick={toggleDropdown}
          >
            Daily Progress Report
          </button>
          {isOpen && (
            <ul className="absolute z-10 left-0 w-full bg-white border border-gray-200 rounded-b shadow-lg">
              <li
                onClick={() => {
                  setIsOpen(false);
                  setActiveComponent("Fill-Form");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Fill Form
              </li>
              <li
                onClick={() => {
                  setIsOpen(false);
                  setActiveComponent("Update-Form");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Update Form
              </li>
              <li
                onClick={() => {
                  setIsOpen(false);
                  setActiveComponent("Upload-Payment-Screenshot");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Payment Screenshot
              </li>
              <li
                onClick={() => {
                  setIsOpen(false);
                  setActiveComponent("Upload-Work-Progress-photo");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Work Progress(Photo)
              </li>
              <li
                onClick={() => {
                  setIsOpen(false);
                  setActiveComponent("Upload-Work-Progress-video");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Work Progress(Video)
              </li>
              <li
                onClick={() => {
                  setIsOpen(false);
                  setActiveComponent("Show-all-reports");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Show all reports
              </li>
            </ul>
          )}
        </div>
        {/* <button
          
          className={getButtonClass("upload")}
        >
          Daily Progress Report
        </button> */}

        <button
          onClick={() => setActiveComponent("siteEngAttendance")}
          className={getButtonClass("sites-management")}
        >
          Attendance
        </button>

        <div className="relative w-100 bg-blue-500 hover:bg-blue-600">
          <button
            className={`w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ${
              HDDOpen ? "rounded-b-none" : ""
            }`}
            onClick={()=>{setHDDOpen(!HDDOpen)}}
          >
            HDD
          </button>
          {HDDOpen && (
            <ul className="absolute z-10 left-0 w-full bg-white border border-gray-200 rounded-b shadow-lg">
              <li
                onClick={() => {
                  setHDDOpen(false);
                  setActiveComponent("Fill-HDD-Form");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Fill HDD Form
              </li>
              {/* <li
                onClick={() => {
                  setHDDOpen(false);
                  setActiveComponent("Update-HDD-Form");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Update HDD Form
              </li> */}
              {/* <li
                onClick={() => {
                  setHDDOpen(false);
                  setActiveComponent("Upload-payment-receipt");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Upload payment receipt
              </li> */}
              {/* <li
                onClick={() => {
                  setHDDOpen(false);
                  setActiveComponent("upload-work-progress-photo/video");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                upload work progress photo/video
              </li> */}
              <li
                onClick={() => {
                  setHDDOpen(false);
                  setActiveComponent("show-all-forms");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Show all forms 
              </li>
              
            </ul>
          )}
        </div>

        {/* <div>
          <button
            onClick={() => setActiveComponent("hdd")}
            className={getButtonClass("hdds")}
          >
            HDD
          </button>
        </div> */}

        <button
          onClick={() => handleLogout()}
          className="w-100 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
      <div className="bg-slate-500 h-1 my-2"></div>
      <div className="bg-gray-50 rounded shadow">{renderComponent()}</div>
    </div>
  );
};

export default SiteEngDashBoard;
