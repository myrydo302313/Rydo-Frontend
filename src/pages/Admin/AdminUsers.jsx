import React, { useEffect, useState } from "react";
import '../../styles/Admin/AdminUsers.css';
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/getUsers`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="users-table-container">
      <h2>User Details</h2>

      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Completed Rides</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.completedRides}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
    </div>
  );
};

export default AdminUsers;
