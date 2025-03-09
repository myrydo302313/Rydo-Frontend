import React, { useState, useEffect, useContext, useRef } from "react";
import "../styles/Home.css";
import { FaSearch } from "react-icons/fa";
import VehiclePanel from "../components/VehiclePanel";
import BottomNav from "../components/BottomNav";
import ConfirmRide from "../components/ConfirmRide";
import SearchingDrivers from "../components/SearchingDrivers";
import { SocketContext } from "../context/SocketContext";
import Services from "../components/Services";
import { useAuth } from "../store/auth";
import LocationSearchPanel from "../components/LocationSearchPanel";
import WaitingForDriver from "../components/WaitingForDriver";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HomePlaces from "../components/HomePlaces";
import { useNavigate } from "react-router-dom";

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

  const waitingForDriverRef = useRef(null);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const { userAuthToken } = useAuth();
  const { user } = useAuth();

  const userData = user?.userData || {};

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: userData._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setWaitingForDriver(true);
    setShowSearchingPanel(false);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  socket.on("ride-cancelled", (ride) => {
    setShowVehiclePanel(true);
    setWaitingForDriver(false);
    setShowConfirmPanel(false);
    setShowSearchingPanel(false);
  });

  const handlePickupChange = async (e) => {
    const inputValue = e.target.value;
    setPickup(inputValue);

    // Prevent API call if input length is less than 3 characters
    if (inputValue.length < 3) {
      setPickupSuggestions([]); // Clear suggestions
      return; // Stop execution
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
      setDestinationSuggestions([]); // Clear suggestions
      return; // Stop execution
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
      return data; // Return data if needed
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  }

  // When showModal is false, also close the Vehicle Panel
  // useEffect(() => {
  //   if (!showModal) {
  //     setShowVehiclePanel(false);
  //     setShowConfirmPanel(false);
  //     setShowSearchingPanel(false);
  //   }
  // }, [showModal]);

  return (
    <>
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
            <input
              onClick={() => {
                setShowModal(true);
                setActiveField("pickup");
              }}
              type="text"
              placeholder="Pickup Location"
              value={pickup}
              onChange={handlePickupChange}
            />
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

      {/* Vehicle Panel (Only Scrollable) */}
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

      <div
        className={`waiting-for-driver-panel ${waitingForDriver ? "show" : ""}`}
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>

      <div className="hero-section">
        {/* <Services /> */}

        <img src="/images/banner1.jpeg" alt="" />
      </div>

      <div className="home-places">
        <HomePlaces />
      </div>

      <div className="rydoLove-main">
        <img src="images/rydoLove.png" alt="" />
      </div>

      <BottomNav />
    </>
  );
};

export default Home;
