import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
        userInput,
        password,
      });
      alert(response.data.message || "Login successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email or Mobile</label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter email or mobile"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/authentication/users/sign-up"
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <p className="my-2 text-sm text-gray-600 ">
          Didn’t remember password?{" "}
          <Link
            to="/authentication/users/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
