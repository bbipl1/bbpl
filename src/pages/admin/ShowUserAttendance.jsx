import React, { useState, useEffect } from "react";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const ShowUserAttendance = () => {
  const [siteEng, setSiteEng] = useState();
  const [siteEngId, setSiteEngId] = useState();
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState();

  // Filter state
  const [filters, setFilters] = useState({
    empId: "",
    empMobile: "",
    empRole: "",
    date: "",
  });

  //fetch site eng details

  useEffect(() => {
    const url = `${serverURL}/api/constructions/site-engineers/get-site-engineer?id=${siteEngId}`;
    axios
      .get(url)
      .then((res) => {
        console.log("id", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [siteEngId]);

  // Fetch attendance data from server
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(
        `${serverURL}/api/constructions/site-engineers/get-manpower-attendance`
      );
      console.log(response.data.data);
      setSiteEngId(response?.data?.data?.siteEngId);
      setAttendanceData(response?.data?.data || []);
      setFilteredData(response?.data?.data || []);
      setLoading(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch attendance data."
      );
      setLoading(false);
    }
  };

  // Apply filters to the data
  const applyFilters = () => {
    const { empId, empMobile, empRole, date } = filters;
    const filtered = attendanceData.filter((record) => {
      return (
        (!empId || record.empId.toString().includes(empId)) &&
        (!empMobile || record.empMobile.toString().includes(empMobile)) &&
        (!empRole ||
          record.empRole.toLowerCase().includes(empRole.toLowerCase())) &&
        (!date || new Date(date)?.toLocaleDateString("en-GB") === record.date)
      );
    });
    setFilteredData(filtered);
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, attendanceData]);

  const showWorkersDetails = (workers) => {
    return (
      <>
        <div className="fixed left-20 top-40 bg-neutral-200 overflow-y-auto border-2 border-blue-200 p-2">
          <div className="grid grid-cols-6 gap-4">
            {workers?.map((worker) => {
              return (
                <>
                  <div>
                    <div className="m-4">Name: {worker?.objId?.name}</div>
                    <div>
                      <img
                        className="w-48 h-48"
                        src={`${worker?.photoURL}`}
                        alt=""
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex justify-center">
            <button onClick={()=>{setIsOpen(false)}} className="m-2 p-2 w-28 bg-red-500 rounded-lg text-white hover:bg-red-600">Close</button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full mx-auto p-6 bg-gray-200 rounded-lg shadow-md">
      {isOpen && showWorkersDetails(selectedWorker)}
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Attendance Records
      </h1>

      {/* Filter Inputs */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="empId"
          placeholder="Filter by Employee ID"
          // value={filters.empId}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="empMobile"
          placeholder="Filter by Mobile"
          // value={filters.empMobile}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="empRole"
          placeholder="Filter by Role"
          // value={filters.empRole}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="date"
          // value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">
            Loading attendance data...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredData?.length === 0 ? (
          <p className="text-center text-gray-500">
            No attendance records found.
          </p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                {/* <th className="border border-gray-300 px-4 py-2">Name</th> */}
                <th className="border border-gray-300 px-4 py-2">
                  SiteEngName
                </th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Day</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((record, index) => (
                <tr
                  key={index}
                  className="text-center"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedWorker(record?.workers);
                  }}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {record.siteEngId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {record?.siteEngObjId?.siteEngObjId?.name}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {record.date}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {record.day}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {record.time}
                  </td>
                  <td>
                    <h1>Latitude: {record?.siteLocation.latitude} </h1>
                    <h1>Longitude: {record?.siteLocation.longitude} </h1>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ShowUserAttendance;
