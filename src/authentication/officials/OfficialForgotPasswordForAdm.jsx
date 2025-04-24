import React, { useState } from "react";
import axios from "axios";

const OfficialForgotPasswordForAdm = () => {
  const [userInput, setUserInput] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/forgot-password`, {
        userInput,
      });
      alert(response.data.message || "Password reset link sent successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send password reset link.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleForgotPassword}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {/* User Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Employee ID / Mobile Number</label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Employee ID or Mobile Number"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OfficialForgotPasswordForAdm;
