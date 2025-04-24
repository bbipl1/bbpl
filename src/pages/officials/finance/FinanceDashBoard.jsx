import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import DevAndFinAttendanceForm from "../../DevAndFinAttendanceForm";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const FinanceDashBoard = () => {
  const [user,setUser]=useState();
  const [error,setError]=useState();
  const location = useLocation();
  const { data } = location.state || {};
  const [activeComponent, setActiveComponent] = useState("profile"); // State to track active component

  const navigate = useNavigate();
  

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <DevAndFinAttendanceForm user={data?.user} />;
      case "requirementsForm":
        return < DevAndFinAttendanceForm/>;
      case "attendance":
        return <DevAndFinAttendanceForm />;

      default:
        return (
          <p className="text-gray-600">Please select an option from above.</p>
        );
    }
  };

//   useEffect(() => {
//     if (!userId) return; // Ensure userId is available before making the request

//     const fetchUserData = async () => {
//       const serverURL = "https://your-server-url.com"; // Replace with your actual server URL
//       const url = `${serverURL}/authen?userId=${userId}`;
//       try {
//         const response = await axios.get(url);
//         setUser(response.data); // Update the state with user data
//         setError("");
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to fetch user data. Please try again.");
//       }
//     };

//     fetchUserData();
//   }, [userId]); 
  const handleLogout = () => {
    const allowMe = window.confirm("Are you sure to logout?");
    if (allowMe) {
      navigate("/authentication/logout");
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
          Hi! {data?.user?.empName}
        </h1>
      </div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <button
          onClick={() => setActiveComponent("profile")}
          className={getButtonClass("profile")}
        >
          Profile
        </button>

        <button
          onClick={() => setActiveComponent("requirementsForm")}
          className={getButtonClass("upload")}
        >
          Requirement Forms
        </button>
        <button
          onClick={() => setActiveComponent("attendance")}
          className={getButtonClass("sites-management")}
        >
          Attendance
        </button>

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

export default FinanceDashBoard;
