import React, { useState, useEffect, useContext} from "react";
import "../styles/Home.css";
import { FaSearch } from "react-icons/fa";
import VehiclePanel from "../components/VehiclePanel";
import BottomNav from "../components/BottomNav";
import ConfirmRide from "../components/ConfirmRide";
import SearchingDrivers from "../components/SearchingDrivers";
import { SocketContext } from "../context/SocketContext";
import { useAuth } from "../store/auth";
import LocationSearchPanel from "../components/LocationSearchPanel";
import HomePlaces from "../components/HomePlaces";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);
  const [showConfirmPanel, setShowConfirmPanel] = useState(false);
  const [showSearchingPanel, setShowSearchingPanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [ride, setRide] = useState();
  const [loading, setLoading] = useState(false);
  const [isWebView, setIsWebView] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent || "";

    // Check if the user is inside WebView
    if (
      /Android/i.test(userAgent) &&
      (userAgent.includes("wv") || userAgent.includes("Version/"))
    ) {
      setIsWebView(true);
    }
  }, []);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const { userAuthToken } = useAuth();
  const { user } = useAuth();

  const userData = user?.userData || {};

  useEffect(() => {
    if (socket && userData._id) {
      socket.emit("join", { userType: "user", userId: userData._id });
    }
  }, [socket, userData]);

  useEffect(() => {
    if (!socket) return;

    const handleRideConfirmed = (ride) => {
      console.log("Ride confirmed event received 🚗");
      setShowSearchingPanel(false);
      setRide(ride);
      navigate("/waiting-for-driver", {
        state: {
          ride: ride,
        },
      });
    };

    const handleRideStarted = (ride) => {
      setWaitingForDriver(false);
      navigate("/riding", { state: { ride } });
    };

    const handleRideCancelled = (ride) => {
      setShowVehiclePanel(true);
      setWaitingForDriver(false);
      setShowConfirmPanel(false);
      setShowSearchingPanel(false);
    };

    socket.on("ride-confirmed", handleRideConfirmed);
    socket.on("ride-started", handleRideStarted);
    socket.on("ride-cancelled", handleRideCancelled);

    return () => {
      socket.off("ride-confirmed", handleRideConfirmed);
      socket.off("ride-started", handleRideStarted);
      socket.off("ride-cancelled", handleRideCancelled);
    };
  }, [socket, navigate]);

  const handlePickupChange = async (e) => {
    const inputValue = e.target.value;
    setPickup(inputValue);

    if (inputValue.length < 3) {
      setPickupSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/api/maps/get-suggestions?input=${inputValue}`,
        {
          method: "GET",
          headers: {
            Authorization: userAuthToken,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch pickup suggestions");

      const data = await response.json();
      setPickupSuggestions(data);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    const inputValue = e.target.value;
    setDestination(inputValue);

    if (inputValue.length < 3) {
      setDestinationSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/api/maps/get-suggestions?input=${e.target.value}`,
        {
          method: "GET",
          headers: {
            Authorization: userAuthToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch destination suggestions");
      }

      const data = await response.json();
      setDestinationSuggestions(data);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  };

  async function findTrip() {
    setShowVehiclePanel(true);
    setShowModal(false);
    setPickupSuggestions([]);
    setDestinationSuggestions([]);

    try {
      const response = await fetch(
        `${baseURL}/api/rides/get-fare?pickup=${encodeURIComponent(
          pickup
        )}&destination=${encodeURIComponent(destination)}`,
        {
          method: "GET",
          headers: {
            Authorization: userAuthToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setFare(data);
    } catch (error) {
      console.error("Error fetching trip fare:", error.message);
    }
  }

  async function createRide() {
    try {
      const response = await fetch(`${baseURL}/api/rides/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userAuthToken,
        },
        body: JSON.stringify({
          pickup,
          destination,
          vehicleType,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  }

  const fetchCurrentLocation = () => {
    setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log(
            "📍 Current Location:",
            latitude,
            longitude,
            "✅ Accuracy:",
            accuracy,
            "meters"
          );

          try {
            const response = await fetch(
              `${baseURL}/api/maps/get-current-location?lat=${latitude}&lng=${longitude}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: userAuthToken,
                },
              }
            );

            const data = await response.json();

            if (response.ok) {
              setPickup(data.location);
            } else {
              alert(
                "Error fetching address: " + (data.message || "Unknown error")
              );
            }
          } catch (error) {
            console.error("❌ Fetch Error:", error);
            alert("Failed to get current location");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("🚫 Geolocation Error:", error);
          alert("Unable to access location. Please enable location services.");
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  return (
    <>
    {/* {console.log('ye h key',process.env.RAZOR_PAY_KEY)} */}
      <div>
        {!isWebView && showBanner && (
          <div className="popup-banner">
            <div className="banner-top">
              <span>
                🚀 Get a smoother and faster experience with our mobile app!
              </span>
              <button
                className="close-button"
                onClick={() => setShowBanner(false)}
              >
                ❌
              </button>
            </div>


            <a href="/Rydo.apk" download className="download-button">
              Download APK
            </a>
          </div>
        )}
      </div>
      <div className="home-main">
        <div className="home-logo">
          <h3 align="center">Rydo</h3>
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

      <div className={`input-modal ${showModal ? "show" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Find A Ride</h2>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ▼
            </button>
          </div>
          <form>
            <div className="pickup-container">
              <input
                onClick={() => {
                  setShowModal(true);
                  setActiveField("pickup");
                }}
                type="text"
                placeholder={
                  loading ? "Fetching Current Location..." : "Pickup Location"
                }
                value={pickup || ""}
                onChange={handlePickupChange}
              />
              <button
                type="button"
                onClick={fetchCurrentLocation}
                className="current-location-btn"
              >
                📍 Use Current Location
              </button>
            </div>

            <input
              onClick={() => {
                setShowModal(true);
                setActiveField("destination");
              }}
              type="text"
              placeholder="Drop Location"
              value={destination}
              onChange={handleDestinationChange}
            />
          </form>

          <button className="find-ride-btn" onClick={findTrip}>
            Find Ride
          </button>
        </div>
        <div className="location-search-panel bg-white h-0 ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setShowModal={setShowModal}
            setShowVehiclePanel={setShowVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div className={`vehicle-show-panel ${showVehiclePanel ? "show" : ""}`}>
        <div className="vehicle-content">
          <VehiclePanel
            setVehicleType={setVehicleType}
            setShowVehiclePanel={setShowVehiclePanel}
            setShowConfirmPanel={setShowConfirmPanel}
            fare={fare}
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
          <ConfirmRide
            setShowSearchingPanel={setShowSearchingPanel}
            createRide={createRide}
            setShowConfirmPanel={setShowConfirmPanel}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
          />
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
          <SearchingDrivers
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
          />
        </div>

        <button
          className="close-btn"
          onClick={() => setShowSearchingPanel(false)}
        >
          ▼
        </button>
      </div>

      <div className="hero-section">
        <img src="/images/banner1.jpeg" alt="" />
      </div>

      <div className="home-places">
        <HomePlaces />
      </div>

      <div className="rydoLove-main">
        <img src="images/rydoLove.png" alt="" />
      </div>

      <Footer/>

      <BottomNav />
    </>
  );
};

export default Home;
