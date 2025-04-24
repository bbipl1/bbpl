import React, { useState, useEffect } from "react";
import axios from "axios";
const serverURL = process.env.REACT_APP_SERVER_URL;

const Admin = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    mobile: "",
    employeeId: "",
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/all-users`);
        const fetchedData = response?.data?.data || [];
        setData(fetchedData); // Set the full data
        setFilteredData(fetchedData); // Initially, display all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts

  // Apply filters in memory with case-insensitive role filtering
  useEffect(() => {
    const applyFilters = () => {
      const filtered = data.filter((item) => {
        const departmentMatch =
          filters.department === "" ||
          item?.department?.toLowerCase().includes(filters?.department?.toLowerCase());
        const mobileMatch =
          filters.mobile === "" || item?.mobile?.includes(filters.mobile);
        const idMatch =
          filters.employeeId === "" || String(item?.id).includes(filters.employeeId);

        return departmentMatch && mobileMatch && idMatch;
      });
      setFilteredData(filtered); // Update the filtered data based on the filters
    };

    applyFilters(); // Apply the filters whenever filters state changes
  }, [filters, data]); // Depend on both filters and data

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="container mx-auto bg-white p-2 rounded-lg shadow-md">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by department
            </label>
            <select
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
              className="w-full p-3 border rounded-md text-gray-700"
            >
              <option value="">All Departments</option>
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              {/* <option value="finance">Finance</option> */}
              <option value="construction">Construction</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Mobile
            </label>
            <input
              type="text"
              placeholder="mobile number"
              value={filters.mobile}
              onChange={(e) =>
                setFilters({ ...filters, mobile: e.target.value })
              }
              className="w-full p-3 border rounded-md text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Employee ID
            </label>
            <input
              type="text"
              value={filters.employeeId}
              onChange={(e) =>
                setFilters({ ...filters, employeeId: e.target.value })
              }
              placeholder="Enter Employee ID"
              className="w-full p-3 border rounded-md text-gray-700"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-3 text-left">ID</th>
                <th className="border border-gray-300 p-3 text-left">Name</th>
                <th className="border border-gray-300 p-3 text-left">Department</th>
                <th className="border border-gray-300 p-3 text-left">Role</th>
                <th className="border border-gray-300 p-3 text-left">Mobile</th>
                <th className="border border-gray-300 p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.empId} className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-300 p-3">{item.id}</td>
                    <td className="border border-gray-300 p-3">{item.name}</td>
                    <td className="border border-gray-300 p-3">{item.department}</td>
                    <td className="border border-gray-300 p-3">{item.role}</td>
                    <td className="border border-gray-300 p-3">{item.mobile}</td>
                    <td className="border border-gray-300 p-3">
                      <button
                        onClick={() => setSelectedEmployee(item)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-5 text-gray-500 italic"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Employee Details
            </h2>
            <p><strong>ID:</strong> {selectedEmployee.id}</p>
            <p><strong>Name:</strong> {selectedEmployee.name}</p>
            <p><strong>Phone:</strong> {selectedEmployee.mobile}</p>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <p><strong>Department:</strong> {selectedEmployee.department}</p>
            <p><strong>Role:</strong> {selectedEmployee.role}</p>
            <p><strong>Gender:</strong> {selectedEmployee.gender}</p>
            <p><strong>password:</strong> {selectedEmployee.password}</p>
            <div className="mt-4">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
