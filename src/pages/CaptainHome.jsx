import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../store/auth";
import { SocketContext } from "../context/SocketContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import "../styles/CaptainHome.css";
import { FaRegClock } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { IoIosSpeedometer } from "react-icons/io";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import CaptainNav from "../components/CaptainNav";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const CaptainHome = () => {
  const { socket } = useContext(SocketContext);
  const { userAuthToken, captain, captainAuthToken } = useAuth();

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const captainData = captain?.captainData || {};
  const { user } = useAuth();

  const userData = user?.userData || {};

  useEffect(() => {
    if (!captainData._id) return; 

    socket.emit("join", { userType: "captain", userId: captainData._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.latitude)
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

    return () => clearInterval(locationInterval); 
  }, [captainData._id]);

  useEffect(() => {
    if (!captainData?._id) return;

    socket.on("new-ride", (data) => {
      console.log('new ride to aya')
      setRide(data);
      setRidePopupPanel(true);
    });

    return () => {
      socket.off("new-ride");
    };
  }, [captainData?._id, socket]);

  async function confirmRide() {
    if (
      ride.pickupLocation &&
      ride.pickupLocation.latitude &&
      ride.pickupLocation.longitude
    ) {
      const { latitude, longitude } = ride.pickupLocation;

      setTimeout(() => {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`,
          "_blank"
        );
      }, 500); 
    }
    try {
      const response = await fetch(`${baseURL}/api/rides/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: captainAuthToken,
        },
        body: JSON.stringify({
          rideId: ride._id,
          captainId: captainData._id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (error) {
      console.error("Failed to confirm ride:", error);
    }
  }

  async function cancelRide(){
    try{
      const response = await fetch(`${baseURL}/api/rides/cancelRide`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: captainAuthToken,
        },
        body: JSON.stringify({
          rideId: ride._id,
        }),
      });
    }catch(e){
      console.log(e)
    }
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

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
            <span className="captain-name">{captainData.name}</span>
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

        <div
          ref={ridePopupPanelRef}
          className="fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12"
        >
          <RidePopUp
            ride={ride}
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            confirmRide={confirmRide}
          />
        </div>
        <div
          ref={confirmRidePopupPanelRef}
          className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
        >
          <ConfirmRidePopUp
            ride={ride}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
            cancelRide={cancelRide}
          />
        </div>
      </div>
      <CaptainNav />
    </>
  );
};

export default CaptainHome;
