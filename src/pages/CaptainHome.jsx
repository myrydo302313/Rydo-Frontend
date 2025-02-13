import React, { useContext, useEffect } from "react";
import { useAuth } from "../store/auth";
import { SocketContext } from "../context/SocketContext";

import "../styles/CaptainHome.css";
import { FaRegClock } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { IoIosSpeedometer } from "react-icons/io";

const CaptainHome = () => {
  const { socket } = useContext(SocketContext);
  const { userAuthToken, captain } = useAuth();

  const captainData = captain?.captainData || {};

  useEffect(() => {
    if (!captainData._id) return; // Prevent execution if captainData._id is not available

    socket.emit("join", { userType: "captain", userId: captainData._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log({
            userId: captainData._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });

          socket.emit("update-location-captain", {
            userId: captainData._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval); // Cleanup interval on unmount
  }, [captainData._id]);

  socket.on("new-ride", (data) => {
    console.log(data);
    // setRide(data);
    // setRidePopupPanel(true);
  });

  return (
    <>
      <div className="captain-home-main">
        <h1 className="captain-home-heading" align="center">
          Rydo Captain
        </h1>

        <div className="captain-home-status">
          <div className="logo-status">
            <img src="/images/car-icon.png" alt="" width={60} height={60} />
          </div>
          <div className="status-description">
            <p className="status-description-first">You are offline ! </p>
            <p>Go online to start accepting rides</p>
          </div>
        </div>

        <div className="captain-today-stats">
          <div className="captain-info">
            <span className="captain-name">Yuvraj Preet</span>
            <div className="captain-earning">
              <span className="captain-today-earning">₹1000</span>
              <span>Earned</span>
            </div>
          </div>
          <div className="captain-stats">
            <div className="category">
              <FaRegClock />
              <p className="first">10.2</p>
              <p className="second">Hours Online</p>
            </div>
            <div className="category">
              <IoIosSpeedometer />
              <p className="first">50KM</p>
              <p className="second">Total Distance</p>
            </div>
            <div className="category">
              <TbReport />
              <p className="first">35</p>
              <p className="second">Total Rides</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptainHome;
