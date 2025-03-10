import React, { useEffect, useState } from "react";
import CaptainNav from "../components/CaptainNav";
import { useAuth } from "../store/auth";
import RideTabs from "../components/RideTabs";
import "../styles/CaptainRides.css";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const CaptainRides = () => {
  const [availableRides, setAvailableRides] = useState([]);
  const [cancelledRides, setCancelledRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const { captain, captainAuthToken } = useAuth();
  const [selectedTab, setSelectedTab] = useState("available");

  // Store captainData in state
  const [captainData, setCaptainData] = useState(captain?.captainData || null);

  // Update captainData when captain changes
  useEffect(() => {
    if (captain?.captainData) {
      setCaptainData(captain.captainData);
    }
  }, [captain]);

  // Fetch rides when component mounts or captainData changes
  useEffect(() => {
    if (captainData?.id) {
      fetchAvailableRides();
      fetchCancelledRides();
      fetchCompletedRides();
    }
  }, [captainData]);

  const fetchAvailableRides = async () => {
    if (!captainData?.id) return;

    try {
      const response = await fetch(
        `${baseURL}/api/rides/pending-rides?captainId=${captainData.id}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Available Rides:", data);
      setAvailableRides(data);
    } catch (error) {
      console.error("Error fetching pending rides:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCancelledRides = async () => {
    if (!captainData?.id) return;

    try {
      const response = await fetch(`${baseURL}/api/captain/cancelled-rides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: captainAuthToken,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Cancelled Rides:", data);
      setCancelledRides(data);
    } catch (error) {
      console.error("Error fetching cancelled rides:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedRides = async () => {
    if (!captainData?.id) return;

    try {
      const response = await fetch(`${baseURL}/api/captain/completed-rides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: captainAuthToken,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Completed Rides:", data);
      setCompletedRides(data);
    } catch (error) {
      console.error("Error fetching completed rides:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RideTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="ride-container">
        {loading ? (
          <p className="loading-text">Loading rides...</p>
        ) : selectedTab === "available" ? (
          availableRides.length === 0 ? (
            <p className="no-rides-text">No pending rides available.</p>
          ) : (
            <div className="ride-grid">
              {availableRides.map((ride) => (
                <div key={ride._id} className="ride-card">
                  <h3 className="ride-id">{ride.user?.name || "Unknown User"}</h3>
                  <p><strong>Pickup:</strong> {ride.pickup || "N/A"}</p>
                  <p><strong>Destination:</strong> {ride.destination || "N/A"}</p>
                  <p><strong>Fare:</strong> ₹{ride.fare || "N/A"}</p>
                  <p><strong>Distance:</strong> {ride.distance ? `${ride.distance} km` : "N/A"}</p>
                  <button className="accept-btn">Accept Ride</button>
                </div>
              ))}
            </div>
          )
        ) : selectedTab === "cancelled" ? (
          cancelledRides.length === 0 ? (
            <p className="no-rides-text">No cancelled rides available.</p>
          ) : (
            <div className="ride-grid">
              {cancelledRides.map((ride) => (
                <div key={ride._id} className="ride-card cancelled">
                  <h3 className="ride-id">{ride.user?.name || "Unknown User"}</h3>
                  <p><strong>Pickup:</strong> {ride.pickup || "N/A"}</p>
                  <p><strong>Destination:</strong> {ride.destination || "N/A"}</p>
                  <p><strong>Fare:</strong> ₹{ride.fare || "N/A"}</p>
                  <p><strong>Distance:</strong> {ride.distance ? `${ride.distance} km` : "N/A"}</p>
                  <p className="cancel-reason"><strong>Reason:</strong> {ride.cancelReason || "N/A"}</p>
                </div>
              ))}
            </div>
          )
        ) : selectedTab === "completed" ? (
          completedRides.length === 0 ? (
            <p className="no-rides-text">No completed rides available.</p>
          ) : (
            <div className="ride-grid">
              {completedRides.map((ride) => (
                <div key={ride._id} className="ride-card completed">
                  <h3 className="ride-id">{ride.user?.name || "Unknown User"}</h3>
                  <p><strong>Pickup:</strong> {ride.pickup || "N/A"}</p>
                  <p><strong>Destination:</strong> {ride.destination || "N/A"}</p>
                  <p><strong>Fare:</strong> ₹{ride.fare || "N/A"}</p>
                  <p><strong>Distance:</strong> {ride.distance ? `${ride.distance} km` : "N/A"}</p>
                </div>
              ))}
            </div>
          )
        ) : null}
      </div>
      <CaptainNav />
    </>
  );
};

export default CaptainRides;
