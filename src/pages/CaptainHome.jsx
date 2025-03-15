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
import { useNavigate } from "react-router-dom";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const CaptainHome = () => {
  const { socket } = useContext(SocketContext);
  const { userAuthToken, captain, captainAuthToken } = useAuth();

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [isWebView, setIsWebView] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [acceptedRide, setAcceptedRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const captainData = captain?.captainData || {};
  const { user } = useAuth();

  const userData = user?.userData || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (!captainData._id) return;

    socket.emit("join", { userType: "captain", userId: captainData._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.latitude);
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
      console.log("new ride to aya");
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
          "_blank",
          "noopener,noreferrer"
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

  async function cancelRide() {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const response = await fetch(`${baseURL}/api/captain/total-earnings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: captainAuthToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch earnings");
        }

        const data = await response.json();
        setTotalEarnings(data.totalEarnings);
      } catch (err) {
        setError(err.message);
      } finally {
      }
    };

    const fetchTotalCommission = async () => {
      try {
        const response = await fetch(
          `${baseURL}/api/captain/total-commission`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: captainAuthToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch earnings");
        }

        const data = await response.json();
        setTotalCommission(data.totalCommission);
      } catch (err) {
        setError(err.message);
      } finally {
      }
    };

    const fetchTotalRides = async () => {
      try {
        const response = await fetch(
          `${baseURL}/api/captain/completed-rides-count`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: captainAuthToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch earnings");
        }

        const data = await response.json();
        setTotalRides(data.completedRidesCount);
      } catch (err) {
        setError(err.message);
      } finally {
      }
    };

    const fetchTotalDistance = async () => {
      try {
        const response = await fetch(`${baseURL}/api/captain/total-distance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: captainAuthToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch earnings");
        }

        const data = await response.json();
        setTotalDistance(data.totalDistance);
      } catch (err) {
        setError(err.message);
      } finally {
      }
    };

    fetchTotalEarnings();
    fetchTotalRides();
    fetchTotalDistance();
    fetchTotalCommission();
  }, []);

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

  const findAcceptedRide = async () => {
    try {
      const response = await fetch(`${baseURL}/api/captain/accepted-rides`, {
        method: "GET",
        headers: {
          Authorization: captainAuthToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ongoing ride");
      }

      const data = await response.json();
      setAcceptedRide(data.ride);
    } catch (error) {
      console.error("Error fetching ongoing ride:", error);
    }
  };

  useEffect(() => {
    findAcceptedRide();
  }, []);

  return (
    <>
      {console.log(acceptedRide)}
      <div className="captain-home-main">
        <h1 className="captain-home-heading" align="center">
          Rydo Captain
        </h1>

        <div className="accepted-ride">
          {acceptedRide && (
            <div className="accepted-ride-card">
              <h3>Current Ride</h3>
              <div>
                <p>
                  <strong>Passenger:</strong> {acceptedRide.user.name}
                </p>

                <button
                  className="accepted-ride-btn"
                  onClick={() => {
                    if (acceptedRide.status === "accepted") {
                      navigate("/captain-ride-pop-up", {
                        state: {
                          ride: acceptedRide,
                        },
                      });
                    } else if (acceptedRide.status === "ongoing") {
                      navigate("/captain-riding", {
                        state: {
                          ride: acceptedRide,
                        },
                      });
                    }
                  }}
                >
                  Move to ride page
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="captain-home-status">
          <div className="logo-status">
            <img src="/images/car-icon.png" alt="" width={60} height={60} />
          </div>
          {captainData.active ? (
            <div className="status-description">
              <p className="status-description-first">You are online ! </p>
              <p>Keep Earning by completing your rides</p>
            </div>
          ) : (
            <div className="status-description">
              <p className="status-description-first">You are offline ! </p>
              <p>Pay your due commission to get online</p>
            </div>
          )}
        </div>

        <div>
          {!isWebView && showBanner && (
            <div className="popup-banner-app">
              <span>Book Ride with Rydo App Now</span>
              <a href="/Rydo.apk" download className="download-button">
                Download
              </a>
            </div>
          )}
        </div>

        <div className="captain-today-stats">
          <div className="captain-info">
            <span className="captain-name">{captainData.name}</span>
            <div className="captain-earning">
              <span className="captain-today-earning">₹{totalEarnings}</span>
              <span>Earned</span>
            </div>
          </div>
          <div className="captain-stats">
            <div className="category">
              {/* <FaRegClock /> */}
              <img src="/images/commission.png" alt="" width={35} height={35} />
              <p className="first">₹{captainData?.commission}</p>
              <p className="second">Total Commission</p>
            </div>
            <div className="category">
              <img src="/images/distance.png" alt="" width={35} height={35} />
              <p className="first">{totalDistance} Km</p>
              <p className="second">Total Distance</p>
            </div>
            <div className="category">
              {/* <TbReport /> */}
              <img src="/images/bike2.png" alt="" width={35} height={35} />
              <p className="first">{totalRides}</p>
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
      </div>
      <CaptainNav />
    </>
  );
};

export default CaptainHome;
