import React, { useContext, useEffect } from "react";
import "../styles/WaitingForDriver.css";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const WaitingForDriver = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    console.log("Socket listener attached ✅");

    const handleRideStarted = (rideData) => {
      console.log("Ride started event received 🚗");
      navigate("/riding", { state: { ride: rideData } });
    };

    socket.on("ride-started", handleRideStarted);

    return () => {
      console.log("Socket listener removed ❌");
      socket.off("ride-started", handleRideStarted);
    };
  }, [socket, navigate]);

  useEffect(() => {
    if (socket && ride) {
      socket.emit("join", { userType: "user", userId: ride.user._id });
    }
  }, [socket, ride]);

  return (
    <>
      <div className="home-logo">
        <h3 align="center">Rydo</h3>
      </div>
      <div className="waiting-driver-container">
        <h1 className="waiting-driver-title">Waiting For The Captain</h1>
        <div className="waiting-driver-captain">
          <img
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="Captain"
          />
          <div className="waiting-driver-captain-info">
            <h2 className="waiting-driver-captain-name">
              {ride?.captain?.name}
            </h2>
            <h4 className="waiting-driver-captain-vehicle">
              {ride?.captain?.vehicleNumber}
            </h4>
            <p className="waiting-driver-captain-vehicle">
              {ride?.captain?.vehicleName}
            </p>
            <h1 className="waiting-driver-otp">Your OTP: {ride?.otp}</h1>
            {ride?.captain?.phone && (
              <p>
                <a
                  href={`tel:${ride?.captain.phone}`}
                  className="waiting-driver-call-btn"
                >
                  📞 Call Captain
                </a>
              </p>
            )}
          </div>
        </div>
        <div className="waiting-driver-ride-details">
          <div className="waiting-driver-detail">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="waiting-driver-detail-title">
                {ride?.pickup?.split(",")[0]}
              </h3>
              <p className="waiting-driver-detail-text">{ride?.pickup}</p>
            </div>
          </div>
          <div className="waiting-driver-detail">
            <i className="ri-map-pin-2-fill"></i>
            <div>
              <h3 className="waiting-driver-detail-title">
                {ride?.destination?.split(",")[0]}
              </h3>
              <p className="waiting-driver-detail-text">{ride?.destination}</p>
            </div>
          </div>
          <div className="waiting-driver-detail">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="waiting-driver-detail-title">₹{ride?.fare}</h3>
              <p className="waiting-driver-detail-text">Cash / UPI</p>
            </div>
          </div>
        </div>
        <div className="cancel-ride-btn-user">
          <button>Cancel Ride</button>
        </div>
      </div>
    </>
  );
};

export default WaitingForDriver;