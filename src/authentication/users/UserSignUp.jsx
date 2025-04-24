import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, formData);
      alert(response.data.message || "Sign up successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Sign up failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">User Sign Up</h2>
        {["name", "email", "mobile", "password", "confirmPassword"].map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700 mb-2 capitalize">{field}</label>
            <input
              type={field.includes("password") ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
        <p className="my-2 text-sm text-gray-600 ">
          Already have an account?{" "}
          <Link
            to="/authentication/users/login"
            className="text-blue-500 hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserSignUp;
