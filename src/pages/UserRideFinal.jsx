import React from "react";
import BottomNav from "../components/BottomNav";
import { useLocation } from "react-router-dom";
import "../styles/UserRideFinal.css"; // Importing separate CSS file

const UserRideFinal = () => {
  const location = useLocation();
  const rideDetails = location.state?.rideDetails;

  return (
    <>
      {console.log(rideDetails)}

      {/* ✅ Logo Section */}
      <div className="home-logo">
        <h3 align='center'>Rydo</h3>
      </div>

      {/* ✅ Ride Completion Message */}
      <div className="ride-final-message">
        <h2>🎉 Your Ride is Completed!</h2>
      </div>

      {/* ✅ Ride Summary Box */}
      <div className="ride-summary-card">
        <h3 align='center'>🚗 Ride Summary</h3>
        <div className="ride-summary-detail">
          <span className="summary-key">Fare:</span>
          <span className="summary-value">₹{rideDetails?.fare || "N/A"}</span>
        </div>
        <p className="payment-instruction" >💰 Pay the fare directly to the captain!</p>
      </div>

      {/* ✅ Thank You Message */}
      <p className="ride-thank-you">🙏 Thank You for choosing Rydo!</p>
      <img src="/images/thankyou.jpg" alt="" />

      {/* ✅ Bottom Navigation */}
      <BottomNav />
    </>
  );
};

export default UserRideFinal;