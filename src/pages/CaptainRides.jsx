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
  const [captainData, setCaptainData] = useState(
    captain?.captainData || JSON.parse(localStorage.getItem("captainData"))
  );

  // Ensure captainData is not lost
  useEffect(() => {
    if (captain?.captainData) {
      setCaptainData(captain.captainData);
      localStorage.setItem("captainData", JSON.stringify(captain.captainData));
    }
  }, [captain]);

  useEffect(() => {
    if (selectedTab === "available") {
      fetchAvailableRides();
    } else if (selectedTab === "cancelled") {
      fetchCancelledRides();
    } else if (selectedTab === "completed") {
      fetchCompletedRides();
    }
  }, [selectedTab, captainData]); // Fetch data when tab changes

  const fetchAvailableRides = async () => {
    if (!captainData || !captainData._id) {
      console.error("Captain ID is undefined");
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/api/rides/pending-rides?captainId=${captainData._id}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAvailableRides(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending rides:", error);
      setLoading(false);
    }
  };

  const fetchCancelledRides = async () => {
    if (!captainData || !captainData._id) {
      console.error("Captain ID is undefined");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/captain/cancelled-rides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: captainAuthToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCancelledRides(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cancelled rides:", error);
      setLoading(false);
    }
  };
  
  const fetchCompletedRides = async () => {
    if (!captainData || !captainData._id) {
      console.error("Captain ID is undefined");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/captain/completed-rides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: captainAuthToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCompletedRides(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching completed rides:", error);
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
                  <h3 className="ride-id">{ride.user.name}</h3>
                  <p>
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p>
                    <strong>Destination:</strong> {ride.destination}
                  </p>
                  <p>
                    <strong>Fare:</strong> ₹{ride.fare}
                  </p>
                  <p>
                    <strong>Distance:</strong> {ride.distance} km
                  </p>
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
                  <h3 className="ride-id">{ride.user.name}</h3>
                  <p>
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p>
                    <strong>Destination:</strong> {ride.destination}
                  </p>
                  <p>
                    <strong>Fare:</strong> ₹{ride.fare}
                  </p>
                  <p>
                    <strong>Distance:</strong> {ride.distance} km
                  </p>
                  <p className="cancel-reason">
                    <strong>Reason:</strong> {ride.cancelReason}
                  </p>
                </div>
              ))}
            </div>
          )
        ) : selectedTab === "completed" ? (
          cancelledRides.length === 0 ? (
            <p className="no-rides-text">No completed rides available.</p>
          ) : (
            <div className="ride-grid">
              {completedRides.map((ride) => (
                <div key={ride._id} className="ride-card completed">
                  <h3 className="ride-id">{ride.user.name}</h3>
                  <p>
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p>
                    <strong>Destination:</strong> {ride.destination}
                  </p>
                  <p>
                    <strong>Fare:</strong> ₹{ride.fare}
                  </p>
                  <p>
                    <strong>Distance:</strong> {ride.distance} km
                  </p>
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
