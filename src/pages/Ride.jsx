import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import "../styles/Ride.css"; // Import the stylish CSS
import GetCoordinates from "../components/GetCoordinates";
import GetDistance from "../components/GetDistance";
import TestComponent from "../components/TestComponent";

const Ride = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleSearch = () => {
    if (!pickup || !dropoff) {
      alert("Please select both locations!");
      return;
    }
    alert(`Searching rides from ${pickup} to ${dropoff}...`);
  };

  return (
    <>
      <Navbar />
      {/* <div className="ride-container">
        <h1>🚗 Book Your Ride</h1>
        <div className="ride-form">
          <div className="input-group">
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            />
            <label>Pick-Up Location</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              required
            />
            <label>Drop-Off Location</label>
          </div>

          <button onClick={handleSearch} className="search-btn">
            🔍 Search Ride
          </button>
        </div>
      </div> */}

      {/* <GetCoordinates/> */}
      {/* <GetDistance/> */}
      <TestComponent/>

      <section className="social-links">
        <SocialLinks />
      </section>
    </>
  );
};

export default Ride;
