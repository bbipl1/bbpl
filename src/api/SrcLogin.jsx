import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    empMobileOrId: "", // Single field to accept either empId or empMobile
    empPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { empMobileOrId, empPassword } = formData;
    let dataToSend = {};

    if (empMobileOrId) {
      // Check if the input looks like a mobile number or empId
      if (empMobileOrId.length === 10 && /^[0-9]+$/.test(empMobileOrId)) {
        // It's a mobile number, send it as empMobile
        dataToSend = { mobile: empMobileOrId, password:empPassword};
      } else {
        // Otherwise, treat it as empId
        dataToSend = { id: empMobileOrId, password:empPassword,};
      }

      try {
        const url = `${serverURL}/api/src/login`;
        const header = { headers: { "Content-Type": "application/json" } };

        setLoading(true);
        axios
          .post(url, JSON.stringify(dataToSend), header)
          .then((res) => {
            const data = res?.data;
            setSuccess("Login successful!");
            console.log("data is",data);
            alert(data?.message);
            const department=res?.data?.user?.department;
            const role=res?.data?.user?.role;
            

            // Redirect based on department
            if (department === "admin") {
              navigate("/pages/admin/dashboard", {
                state: { data },
                replace: true,
              });
            } else if (department === "developer") {
              navigate("/pages/developer-attendance-form", {
                state: { data },
                replace: true,
              });
            } else if (department === "construction") {
              if (role === "site-engineer") {
                navigate("/pages/constructions/site-engineer/dashboard", {
                  state: { data },
                  replace: true,
                });
              } else {
                alert("page not found");
              }
            }
          })
          .catch((err) => {
            alert(err?.response?.data?.message);
            console.log(err?.response?.data?.message);
          })
          .finally((final) => {
            setLoading(false);
          });
      } catch (err) {
        setError(err?.message);
        console.log(err);
        setLoading(false);
      }
    }

    // setLoading(false);
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <div className="mb-6">
            <label
              htmlFor="mobileOrId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Employee/Vendor ID/Mobile No
            </label>
            <input
              id="mobileOrId"
              name="empMobileOrId"
              value={formData.empMobileOrId}
              onChange={handleChange}
              placeholder="Enter your employee ID or mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="empPassword"
                value={formData.empPassword}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute top-2 right-3 text-gray-600"
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
    

          <div className="flex items-center justify-center mb-4">
            {loading && (
              <ClipLoader color="#4A90E2" loading={loading} size={50} />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            Login
          </button>
        </form>
      
      </div>
    </div>
  );
}

export default Login;
