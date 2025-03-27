import React, { useContext, useEffect, useRef, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
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

const firebaseConfig = {
  apiKey: "AIzaSyDThI2apXiWXj-xLvRwgxHsPX88D2UBWnM",
  authDomain: "rydo-636aa.firebaseapp.com",
  projectId: "rydo-636aa",
  storageBucket: "rydo-636aa.appspot.com",
  messagingSenderId: "843567514235",
  appId: "1:843567514235:web:9a9aa5835d846699d818de",
  measurementId: "G-KYZXG2822E",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const showNotification = (title, body) => {
  if (!("Notification" in window)) {
    console.error("🚨 This browser does not support desktop notifications.");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body });
      }
    });
  }
};

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
      setRide(data);
      setRidePopupPanel(true);
      showNotification("New Ride Request", "A new ride is available!", data);
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
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
        window.open(googleMapsUrl, "_blank");
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
        setTotalDistance(data.totalDistance.toFixed(2));
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

  // Notification Part

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          );
          console.log("✅ Service Worker Registered:", registration);

          // Ensure FCM Token is retrieved only after SW is registered and captainData is available
          if (captainData?._id) {
            requestNotificationPermission(captainData._id);
          } else {
            console.warn(
              "⏳ Waiting for captainData before requesting FCM token..."
            );
          }
        } catch (error) {
          console.error("❌ Service Worker Registration Failed:", error);
        }
      }
    };

    const requestNotificationPermission = async (captainId) => {
      if (!captainId) {
        console.warn("🚨 captainId not available, skipping FCM token request.");
        return;
      }

      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey:
              "BHqlCp3o_qEs99RjTzss5Lw_pg0V8ueDszdqtkA-FLRmXuZbY9QHh1NJIdxUukd9G3v_RlpPLpuuUxaHBsCpjyI",
          });

          console.log("🔥 FCM Token:", token);
          await saveTokenToDatabase(captainId, token);
        } else {
          console.warn("🚫 Notification Permission Denied.");
        }
      } catch (error) {
        console.error("❌ Error Getting FCM Token:", error);
      }
    };

    const saveTokenToDatabase = async (userId, token) => {
      if (!userId || !token) {
        console.error("🚨 Missing userId or FCM token, skipping API call.");
        return;
      }

      console.log("📤 Sending to backend:", { userId, fcmToken: token });

      try {
        const response = await fetch(
          `${baseURL}/api/notifications/save-fcm-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, fcmToken: token, role: "captain" }),
          }
        );

        const data = await response.json();
        console.log("✅ Backend Response:", data);

        if (!response.ok) throw new Error("Failed to store FCM token");
      } catch (error) {
        console.error("❌ Error saving FCM token:", error);
      }
    };

    const setupForegroundListener = () => {
      onMessage(messaging, (payload) => {
        console.log("📩 Foreground Notification Received:", payload);
        alert(payload.notification?.title || "New Notification");
      });
    };

    if (captainData?._id) {
      registerServiceWorker();
    } else {
      console.warn(
        "⏳ Waiting for captainData before initializing notifications..."
      );
    }

    setupForegroundListener();
  }, [captainData]); // Runs only when captainData changes

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
    const userAgent = navigator.userAgent || "";

    // Check if the user is inside WebView
    if (
      /Android/i.test(userAgent) &&
      (userAgent.includes("wv") || userAgent.includes("Version/"))
    ) {
      setIsWebView(true);
    }
    findAcceptedRide();

    if (window.location.pathname === "/captainHome") {
      document.body.style.minHeight = "120vh";
    }
  }, []);

  return (
    <>
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
            // confirmRide={confirmRide}
            cancelRide={cancelRide}
          />
        </div>
      </div>
      <CaptainNav />
    </>
  );
};

export default CaptainHome;
