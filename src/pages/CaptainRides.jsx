import React, { useEffect, useState } from "react";
import CaptainNav from "../components/CaptainNav";
import { useAuth } from "../store/auth";
import RideTabs from "../components/RideTabs";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const CaptainRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userAuthToken, captain, captainAuthToken } = useAuth();

  // Store captainData in state
  const [captainData, setCaptainData] = useState(
    captain?.captainData || JSON.parse(localStorage.getItem("captainData"))
  );

  // On first render, ensure captainData is not lost
  useEffect(() => {
    if (captain?.captainData) {
      setCaptainData(captain.captainData);
      localStorage.setItem("captainData", JSON.stringify(captain.captainData)); // Persist in localStorage
    }
  }, [captain]);

  useEffect(() => {
    fetchPendingRides();
  }, [captainData]); // Fetch rides only after captainData is set

  const fetchPendingRides = async () => {
    if (!captainData || !captainData._id) {
      console.error("Captain ID is undefined");
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/api/rides/pending-rides?captainId=${captainData._id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRides(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending rides:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <CaptainNav />
      <RideTabs />
      <div className="ride-container">
        {loading ? (
          <p className="loading-text">Loading rides...</p>
        ) : rides.length === 0 ? (
          <p className="no-rides-text">No pending rides available.</p>
        ) : (
          <div className="ride-grid">
            {rides.map((ride) => (
              <div key={ride._id} className="ride-card">
                <h3 className="ride-id">Ride ID: {ride._id}</h3>
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
                  <strong>Status:</strong> {ride.status}
                </p>
                <p>
                  <strong>Distance:</strong> {(ride.distance / 1000).toFixed(2)}{" "}
                  km
                </p>
                <button className="accept-btn">Accept Ride</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CaptainRides;
