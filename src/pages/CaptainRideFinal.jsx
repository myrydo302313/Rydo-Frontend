import React from "react";
import CaptainNav from "../components/CaptainNav";
import "../styles/CaptainRideFinal.css";
import { useLocation } from "react-router-dom";

const CaptainRideFinal = () => {
  const location = useLocation();
  const rideDetails = location.state?.rideDetails;

  return (
    <>
      {/* 🎉 Finished Ride Image */}
      <div className="finished-ride">
        <img src="/images/congrats.jpg" alt="Congratulations" />
      </div>

      {/* ✅ Well Done Message */}
      <div className="final-ride-para">
        <h2>Well Done! You have completed the ride</h2>
      </div>

      {/* 📋 Ride Summary */}
      <div className="final-ride-summary">
        <h2>Ride Summary</h2>
        {rideDetails ? (
          <div className="ride-summary-container">
            <span className="ride-summary-key">Pickup:</span>
            <span className="ride-summary-value">{rideDetails.pickup}</span>

            <span className="ride-summary-key">Destination:</span>
            <span className="ride-summary-value">{rideDetails.destination}</span>

            <span className="ride-summary-key">Ride Distance:</span>
            <span className="ride-summary-value">{rideDetails.distance} km</span>

            <span className="ride-summary-key">Ride Fare:</span>
            <span className="ride-summary-value">₹ {rideDetails.fare}</span>
          </div>
        ) : (
          <p>No ride details available.</p>
        )}
      </div>

      <CaptainNav />
    </>
  );
};

export default CaptainRideFinal;
