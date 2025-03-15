import React, { useEffect, useState } from "react";
import "../../styles/Admin/AdminHome.css";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const AdminHome = () => {
  //   const { userAuthToken,user } = useAuth();

  // const userData=user?.userData;

  const [showDropdown, setShowDropdown] = useState(false);
  const [totalCaptains, setTotalCaptains] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalRides, setTotalRides] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalCaptains = async () => {
      try {
        const response = await fetch(`${baseURL}/api/admin/total-captains`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setTotalCaptains(data.totalCaptains);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchTotalRides = async () => {
      try {
        const response = await fetch(`${baseURL}/api/admin/total-rides`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setTotalRides(data.totalRides);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch(`${baseURL}/api/admin/total-users`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setTotalUsers(data.totalUsers);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTotalCaptains();
    fetchTotalRides();
    fetchTotalUsers();
  }, []);

  return (
    <>
      <h1 className="admin-home-heading">
        Welcome <span>Yuvraj</span> To The Admin Panel
      </h1>

      <div className="rydo-counts">
        <div className="admin-card">
          <h3>Users</h3>
          <img src="/images/admin-users.png" alt="Users" width={60} />
          <p>{totalUsers}</p>
        </div>
        <div className="admin-card">
          <h3>Captains</h3>
          <img src="/images/admin-driver.png" alt="Captains" width={60} />
          <p>{totalCaptains}</p>
        </div>
        <div className="admin-card">
          <h3>Rides</h3>
          <img src="/images/admin-ride.png" alt="Rides" width={60} />
          <p>{totalRides}</p>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
