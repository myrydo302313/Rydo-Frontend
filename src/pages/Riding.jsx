import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import "../styles/Riding.css"; // Importing the new CSS file

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="riding-container">
      {/* <Link to="/home" className="home-button">
        <i className="home-icon ri-home-5-line"></i>
      </Link> */}

      <img src="/images/relax.jpg" alt="" />

      <div className="riding-details">
        <div className="captain-info">
          <img
            className="captain-image"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="Captain"
          />
          <div className="captain-text">
            <h2 className="captain-name">{ride?.captain.name}</h2>
            <h4 className="captain-vehicle-number">
              {ride?.captain.vehicleNumber}
            </h4>
            <p className="captain-vehicle-name">{ride?.captain.vehicleName}</p>
          </div>
        </div>

        <div className="ride-info">
          <div className="ride-details">
            <div className="ride-location">
              <i className="location-icon ri-map-pin-2-fill"></i>
              <div>
                <h3 className="ride-address">{ride?.destination.split(",")[0]}</h3>
                <p className="ride-destination">{ride?.destination}</p>
              </div>
            </div>
            <div className="ride-fare">
              <i className="fare-icon ri-currency-line"></i>
              <div>
                <h3 className="fare-amount">₹{ride?.fare}</h3>
                <p className="fare-mode">Cash / UPI</p>
              </div>
            </div>
          </div>
        </div>

        <p className="riding-message-user"></p>

        <p className="user-make-payment">
          Reaching the destination soon
        </p>
        <p className="user-make-payment">
          Make the payment directly to the captain
        </p>
        <p className="user-reach-out">
        Have any query or feedback, Reach out to us!
        </p>
      </div>
    </div>
  );
};

export default Riding;
