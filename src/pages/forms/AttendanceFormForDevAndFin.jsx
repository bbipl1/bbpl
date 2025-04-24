import React, { useState } from "react";
import axios from "axios";

const AttendanceForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    geoCoordinates: [{ latitude: "", longitude: "" }],
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGeoChange = (index, e) => {
    const { name, value } = e.target;
    const updatedGeoCoordinates = [...formData.geoCoordinates];
    updatedGeoCoordinates[index][name] = value;
    setFormData({ ...formData, geoCoordinates: updatedGeoCoordinates });
  };

  const addGeoCoordinate = () => {
    setFormData({
      ...formData,
      geoCoordinates: [...formData.geoCoordinates, { latitude: "", longitude: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/attendance", formData);
      setMessage(response.data.message);
      setError("");
      setFormData({
        employeeId: "",
        employeeName: "",
        geoCoordinates: [{ latitude: "", longitude: "" }],
      });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Attendance Form</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Employee Name:</label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleInputChange}
            required
          />
        </div>
        {formData.geoCoordinates.map((geo, index) => (
          <div key={index}>
            <label>Latitude:</label>
            <input
              type="text"
              name="latitude"
              value={geo.latitude}
              onChange={(e) => handleGeoChange(index, e)}
              required
            />
            <label>Longitude:</label>
            <input
              type="text"
              name="longitude"
              value={geo.longitude}
              onChange={(e) => handleGeoChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addGeoCoordinate}>
          Add GeoCoordinate
        </button>
        <button type="submit">Submit Attendance</button>
      </form>
    </div>
  );
};

export default AttendanceForm;
