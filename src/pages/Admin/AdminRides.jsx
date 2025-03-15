import React, { useEffect, useState } from "react";
import "../../styles/Admin/AdminUsers.css";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const AdminRides = () => {
  const [rides, setRides] = useState([]);

  const getRides = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/getRides`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setRides(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getRides();
  }, []);
  return (
    <div className="users-table-container">
      <h2>Ride Details</h2>
      {console.log(rides)}

      {rides.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Captain</th>
              <th>Distance</th>
              <th>Fare</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride._id}>
                <td>{ride.user ? ride.user.name : "Unknown User"}</td>
                <td>{ride.captain ? ride.captain.name : "N/A"}</td>
                <td>{ride.distance} Km</td>
                <td>₹{ride.fare}</td>
                <td>{ride.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-orders">No Rides found.</p>
      )}
    </div>
  );
};

export default AdminRides;
