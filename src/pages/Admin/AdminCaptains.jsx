import React, { useEffect, useState } from "react";
import '../../styles/Admin/AdminUsers.css';

const baseURL = process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const AdminCaptains = () => {
  const [users, setUsers] = useState([]);

  const getCaptains = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/getCaptains`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch captains");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching captains:", error);
    }
  };

  useEffect(() => {
    getCaptains();
  }, []);

  return (
    <div className="users-table-container">
      <h2>Captain Details</h2>
      
      {users.length > 0 ? (
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicle</th>
                <th>Vehicle Number</th>
                <th>Vehicle Type</th>
                <th>Commission</th>
                <th>Aadhaar</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.vehicleName}</td>
                  <td>{user.vehicleNumber}</td>
                  <td>{user.vehicleType}</td>
                  <td>{user.commission}</td>
                  <td>
                    {user.aadhaar ? (
                      <a style={{ color: "red" }} href={user.aadhaar} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      <p>N/A</p>
                    )}
                  </td>
                  <td>{user.active ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-orders">No Captains found.</p>
      )}
    </div>
  );
};

export default AdminCaptains;
