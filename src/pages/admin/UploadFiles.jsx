import React, { useState } from "react";
import axios from "axios";
import { header } from "framer-motion/client";

const serverURL = process.env.REACT_APP_SERVER_URL;
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [gender, setGender] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [department, setDepartment] = useState();
  const [role, setRole] = useState();
  const [addText, setAddText] = useState("Add User");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post(
        `${serverURL}/api/upload-users-details`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("Upload successful!");
      console.log("Server Response:", response.data);
    } catch (error) {
      setUploadStatus("Upload failed.");
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = () => {
    const payload = {
      id,
      name,
      mobile,
      email,
      department,
      role,
      gender,
      password,
    };
    const url = `${serverURL}/api/admin/add-new-user`;
    const header = {
      header: "application/json",
    };

    console.log(payload);

    axios
      .post(url, payload, header)
      .then((res) => {
        alert(res.data.message);
        setAddText("Success");
        console.log(res);
        setMobile("");
        setEmail("");
        setDepartment("");
        setPassword("");
        setName("");
        setRole("");
        setGender("");
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.message);
      })
      .finally((final) => {
        // alert("")
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-4">Upload File</h1>
        <input type="file" onChange={handleFileChange} className="mb-4 block" />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Upload
        </button>
        {uploadStatus && <p className="mt-4 text-gray-700">{uploadStatus}</p>}
      </div>
      <div>
        <div className="grid grid-cols-3 gap-4 mt-24">
          {/* <div>
            <label htmlFor="id">ID*</label>
            <input
              type="text"
              id="id"
              name="id"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              className="w-full p-1"
            />
          </div> */}
          <div>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full p-1"
            />
          </div>
          <div>
            <label htmlFor="name">Mobile*</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              className="w-full p-1"
            />
          </div>
          <div>
            <label htmlFor="name">Email*</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-1"
            />
          </div>

          <div>
            <label htmlFor="department">Department*</label>
            <select
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              value={department}
              name="department"
              id="department"
              className="w-full p-1"
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="construction">Construction</option>
            </select>
          </div>
          <div>
            <label htmlFor="role">Role*</label>
            <select
              onChange={(e) => {
                setRole(e.target.value);
              }}
              value={role}
              name="role"
              id="role"
              className="w-full p-1"
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="site-engineer">Site-Engineer</option>
            </select>
          </div>
          <div>
            <label htmlFor="gender">Gender*</label>
            <select
              onChange={(e) => {
                setGender(e.target.value);
              }}
              value={gender}
              name="gender"
              id="gender"
              className="w-full p-1"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              id="password"
              name="password"
              value={password}
              className="w-full p-1"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={addText !== "Add User"}
            className={`w-28 m-2 p-2 rounded-lg text-white 
    ${
      addText === "Add User"
        ? "bg-green-500 hover:bg-green-600"
        : "bg-gray-400 cursor-not-allowed"
    }`}
          >
            {addText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
