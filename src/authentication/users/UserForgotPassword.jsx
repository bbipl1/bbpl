import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserForgotPassword = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/forgot-password`, {
        emailOrMobile,
      });
      alert(response.data.message || "Password reset link sent!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reset password!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleForgotPassword}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email or Mobile</label>
          <input
            type="text"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter email or mobile"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
        <p className="my-2 text-sm text-gray-600 ">
          I know my password?{" "}
          <Link
            to="/authentication/users/login"
            className="text-blue-500 hover:underline"
          >
            Go Back
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserForgotPassword;
