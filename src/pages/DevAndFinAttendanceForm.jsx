import React, { useState, useEffect } from "react";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const DevAndFinAttendanceForm = ({ user }) => {
  const [formData, setFormData] = useState({
    employeeId: user?.empId || "",
    employeeName: user?.empName || "",
    employeeMobile: user?.empMobile || "",
    employeeEmail: user?.empEmail || "",
    geoCoordinates: [],
    role: user?.empRole || "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitText, setSubmitText] = useState("Submit");

  const requestAndCaptureLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          geoCoordinates: [{ latitude: latitude.toString(), longitude: longitude.toString() }],
        }));
      },
      (err) => {
        setError("Unable to fetch geolocation. Please enable location services.");
        console.error("Geolocation error:", err);
      }
    );
  };

  const submitAttendance = async () => {
    console.log("sib",formData)
    console.log("sib2",serverURL)
    try {
      const url = `${serverURL}/api/attendance/dev-and-fin/submit-attendance`;
      const response = await axios.post(url, formData);
      setMessage(response.data.message || "Attendance submitted successfully.");
      setError("");
      setSubmitText("Submitted");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while submitting attendance.");
      setMessage("");
    }
  };

  useEffect(() => {
    requestAndCaptureLocation();

    const interval = setInterval(() => {
      requestAndCaptureLocation();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Attendance Form</h1>
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-4">
        <p className="font-medium"> ID:</p>
        <p className="text-gray-700">{formData.employeeId}</p>
      </div>
      <div className="mb-4">
        <p className="font-medium"> Name:</p>
        <p className="text-gray-700">{formData.employeeName}</p>
      </div>
      <div className="mb-4">
        <p className="font-medium"> Mobile:</p>
        <p className="text-gray-700">{formData.employeeMobile}</p>
      </div>
      <div className="mb-4">
        <p className="font-medium"> Email:</p>
        <p className="text-gray-700">{formData.employeeEmail}</p>
      </div>
      <div className="mb-4">
        <p className="font-medium">Role:</p>
        <p className="text-gray-700">{formData.role || "Loading role..."}</p>
      </div>

      {formData.geoCoordinates.length > 0 && (
        <div className="mb-4">
          <p className="font-medium">Current Location:</p>
          <p className="text-gray-700">
            Latitude: {formData.geoCoordinates[0].latitude}, Longitude:{" "}
            {formData.geoCoordinates[0].longitude}
          </p>
        </div>
      )}

      <button
        onClick={submitAttendance}
        className={`w-full px-4 py-2 text-white rounded-lg focus:ring ${
          submitText === "Submit" ? "bg-green-500 hover:bg-green-600 focus:ring-green-300" : "bg-gray-400"
        }`}
        disabled={submitText !== "Submit"}
      >
        {submitText}
      </button>
    </div>
  );
};

export default DevAndFinAttendanceForm;
