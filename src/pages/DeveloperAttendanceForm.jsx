import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const DeveloperAttendanceForm = () => {
    const navigate=useNavigate();
    const handleBack=()=>{
        navigate("/authentication/login")
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Developer Attendance Form</h1>
        <p className="text-lg text-gray-600">
          This feature is currently under development. Stay tuned for updates!
        </p>
        <div className="mt-8">
          <button onClick={handleBack} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperAttendanceForm;
