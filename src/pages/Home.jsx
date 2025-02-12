import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { FaSearch } from "react-icons/fa";
import VehiclePanel from "../components/VehiclePanel";
import BottomNav from "../components/BottomNav";
import ConfirmRide from "../components/ConfirmRide";
import SearchingDrivers from "../components/SearchingDrivers";
import Services from "../components/Services";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);
  const [showConfirmPanel, setShowConfirmPanel] = useState(false);
  const [showSearchingPanel, setShowSearchingPanel] = useState(false);

  // When showModal is false, also close the Vehicle Panel
  useEffect(() => {
    if (!showModal) {
      setShowVehiclePanel(false);
      setShowConfirmPanel(false);
      setShowSearchingPanel(false);
    }
  }, [showModal]);

  return (
    <>
      <div className="home-main">
        <div className="home-logo">
          <h3>Rydo</h3>
        </div>

        <div className="home-input-base">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Where to?"
            onClick={() => setShowModal(true)}
            readOnly
          />
        </div>
      </div>

      {/* Full-Screen Input Modal */}
      <div className={`input-modal ${showModal ? "show" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Find A Ride</h2>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ▼
            </button>
          </div>
          <form>
            <input
              type="text"
              placeholder="Pickup Location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              type="text"
              placeholder="Drop Location"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
          <button
            className="find-ride-btn"
            onClick={() => setShowVehiclePanel(true)}
          >
            Find Ride
          </button>
        </div>
      </div>

      {/* Vehicle Panel (Only Scrollable) */}
      <div className={`vehicle-show-panel ${showVehiclePanel ? "show" : ""}`}>
        <div className="vehicle-content">
          <VehiclePanel
            setShowVehiclePanel={setShowVehiclePanel}
            setShowConfirmPanel={setShowConfirmPanel}
          />
        </div>
        <button
          className="close-btn"
          onClick={() => setShowVehiclePanel(false)}
        >
          ▼
        </button>
      </div>

      <div
        className={`confirm-vehicle-show-panel ${
          showConfirmPanel ? "show" : ""
        }`}
      >
        <div className="vehicle-content">
          <ConfirmRide setShowSearchingPanel={setShowSearchingPanel} />
        </div>
        <button
          className="close-btn"
          onClick={() => setShowConfirmPanel(false)}
        >
          ▼
        </button>
      </div>

      <div
        className={`searching-drivers-show-panel ${
          showSearchingPanel ? "show" : ""
        }`}
      >
        <div className="vehicle-content">
          <SearchingDrivers />
        </div>
        <button
          className="close-btn"
          onClick={() => setShowSearchingPanel(false)}
        >
          ▼
        </button>
      </div>

      {/* <div className="hero-section">
        <Services />
      </div> */}

      <BottomNav />
    </>
  );
};

export default Home;
