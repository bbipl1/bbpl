import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageWorker = ({ siteEngineerId }) => {
  const [deletedWorker, setDeletedWorkers] = useState();
  const [workers, setWorkers] = useState([]);
  const [isManpowerAdded, setIsManPowerAdded] = useState(false);
  const [addManPowerText, setAddManPowerText] = useState("Add new");
  const [siteEngObjectId, setSiteEngObjectId] = useState();
  const [newWorker, setNewWorker] = useState({
    name: "",
    mobile: "",
    aadhaarPhoto: null,
    panPhoto: null,
    accountDetailsPhoto: null,
  });
  const [view, setView] = useState("list"); // State to toggle between views

  const serverURL = process.env.REACT_APP_SERVER_URL;

  // Fetch site engineer object ID
  useEffect(() => {
    const url = `${serverURL}/api/constructions/site-engineers/get-site-engineer?id=${siteEngineerId}`;
    axios
      .get(url)
      .then((res) => {
        setSiteEngObjectId(res?.data?.data?.siteEngObjId);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [serverURL, siteEngineerId]);

  // Fetch workers assigned to the site engineer
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const url = `${serverURL}/api/constructions/site-engineers/get-all-workers?siteEngineerId=${siteEngineerId}`;
        const response = await axios.get(url);
        console.log(response);
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
  }, [serverURL, siteEngineerId]);
  //fetch deleted workers
  useEffect(() => {
    if (!siteEngObjectId) {
      return; // Skip fetching if siteEngObjectId is not yet defined or still loading
    }
    const fetchWorkers = async () => {
      try {
        const url = `${serverURL}/api/constructions/site-engineers/get-all-deleted-workers?siteEngId=${siteEngineerId}&siteEngObjId=${siteEngObjectId}`;
        const response = await axios.get(url);
        // console.log("meurl", response?.data?.deletedWorkers);
        setDeletedWorkers(response?.data?.deletedWorkers);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
  }, [serverURL, siteEngObjectId, siteEngineerId]);

  // Handle file input changes
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    console.log("File selected for", field, file);
    setNewWorker({ ...newWorker, [field]: file });
  };

  // Handle adding a new worker
  const handleAddWorker = async () => {
    const { name, mobile, aadhaarPhoto, panPhoto, accountDetailsPhoto } =
      newWorker;
    if (!name || !mobile) {
      alert("Please fill in all fields and upload all required documents");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("aadhaarPhoto", aadhaarPhoto);
    formData.append("panPhoto", panPhoto);
    formData.append("accountDetailsPhoto", accountDetailsPhoto);
    formData.append("siteEngineerId", siteEngineerId);
    formData.append("siteEngObjId", siteEngObjectId);

    // Log FormData contents to debug
    // for (let [key, value] of formData.entries()) {
    //   console.log("loop", key, value);
    // }
    // console.log("wl", formData);

    try {
      const response = await axios.post(
        `${serverURL}/api/constructions/site-engineers/add-worker`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response) {
        setWorkers([...workers, response.data]);
        setNewWorker({
          name: "",
          mobile: "",
          aadhaarPhoto: null,
          panPhoto: null,
          accountDetailsPhoto: null,
        });
        setIsManPowerAdded(true);
        setAddManPowerText("Success");
        alert("Manpower added successfully.");
      }
    } catch (error) {
      alert("Error");
      console.error("Error adding worker:", error);
    }
  };

  // Handle deleting a worker
  const handleDeleteWorker = async (workerId) => {
    const res = window.confirm("Are you sure?");
    if (!res) {
      return;
    }
    try {
      const url = `${serverURL}/api/constructions/site-engineers/delete-worker`;
      const filterData = {
        workerId,
        siteEngObjId: siteEngObjectId,
        siteEngId: siteEngineerId,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      await axios
        .put(url, filterData, headers)
        .then((res) => {
          console.log("Manpower deleted");
          alert("Manpower deleted successfully.");
        })
        .catch((err) => {
          console.log(err);
        });
      // setWorkers(workers.filter((worker) => worker._id !== workerId));
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  const handleAddManpower = () => {
    setAddManPowerText("Add new");
    setIsManPowerAdded(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow">
      <div className="mb-4 flex justify-evenly">
        {/* Navigation for different views */}
        <button
          onClick={() => setView("list")}
          className="p-2 bg-blue-500 text-white rounded-md mr-2 w-20"
        >
          List
        </button>
        <button
          onClick={() => setView("add")}
          className="p-2 bg-blue-500 text-white rounded-md mr-2 w-20"
        >
          Add
        </button>
        <button
          onClick={() => setView("delete")}
          className="p-2 bg-blue-500 text-white rounded-md w-20"
        >
          Deleted
        </button>
      </div>

      {/* Conditional Rendering for different views */}
      {view === "list" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Manpower List</h3>
          <ul className="space-y-1">
            {workers.map((worker) => (
              <li
                key={worker._id}
                className="flex items-center justify-between p-2  bg-white rounded-md shadow"
              >
                <span className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <div>Name: {worker.name}</div>
                      <div>Mobile: {worker.mobile}</div>
                      <div>Joining date: {worker.date}</div>
                      <div>Joining time: {worker.time}</div>
                      <div>Joining day: {worker.day}</div>
                    </div>
                    <div>
                      Aadhaar Card
                      <img
                        className="w-32 h-32"
                        src={worker?.aadhaarURL}
                        alt="Aadhaar"
                      />
                    </div>
                    <div>
                      PAN Card
                      <img
                        className="w-32 h-32"
                        src={worker?.panCardURL}
                        alt="PAN Card"
                      />
                    </div>
                    <div>
                      Account Details
                      <img
                        className="w-32 h-32"
                        src={worker?.accountDetailsURL}
                        alt="Account Details"
                      />
                    </div>
                  </div>
                </span>
                <button
                  onClick={() => handleDeleteWorker(worker._id)}
                  className="p-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === "add" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add New Manpower</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="name">Name*</label>
              <input
                id="name"
                type="text"
                placeholder="Worker Name"
                value={newWorker.name}
                onChange={(e) => {
                  setNewWorker({ ...newWorker, name: e.target.value });
                  handleAddManpower();
                }}
                className="p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="mobile">Mobile*</label>
              <input
                id="mobile"
                type="text"
                placeholder="Mobile"
                value={newWorker.mobile}
                onChange={(e) => {
                  handleAddManpower();
                  setNewWorker({ ...newWorker, mobile: e.target.value });
                }}
                className="p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Aadhaar Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Aadhaar Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleAddManpower();
                  handleFileChange(e, "aadhaarPhoto");
                }}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* PAN Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                PAN Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleAddManpower();
                  handleFileChange(e, "panPhoto");
                }}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Account Details Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Details Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleAddManpower();
                  handleFileChange(e, "accountDetailsPhoto");
                }}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <button
              onClick={handleAddWorker}
              disabled={isManpowerAdded}
              className={`mt-4 p-2 text-white rounded-md transition ${
                isManpowerAdded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {addManPowerText}
            </button>
          </div>
        </div>
      )}

      {view === "delete" && (
        <>
          {deletedWorker && deletedWorker.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Deleted Workers</h3>
              <ul>
                {deletedWorker.map((worker) => (
                  <li
                    key={worker._id}
                    className="flex items-center justify-between p-2 m-1 bg-white rounded-md shadow"
                  >
                    <span>
                      Name: {worker.name} - Mobile: {worker.mobile}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No deleted workers found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ManageWorker;
