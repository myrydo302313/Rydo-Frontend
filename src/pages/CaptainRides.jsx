import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import CaptainNav from "../components/CaptainNav";
import { useAuth } from "../store/auth";
import RideTabs from "../components/RideTabs";
import "../styles/CaptainRides.css";
import { useNavigate } from "react-router-dom";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const CaptainRides = () => {
  const [availableRides, setAvailableRides] = useState([]);
  const [cancelledRides, setCancelledRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const { captain, captainAuthToken } = useAuth();
  const [selectedTab, setSelectedTab] = useState("available");
  const [captainDetails, setCaptainDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (captain && captain.captainData) {
      setCaptainDetails(captain.captainData);
    }
  }, [captain]);

  useEffect(() => {
    if (captainDetails._id) {
      fetchAvailableRides();
      fetchCancelledRides();
      fetchCompletedRides();
    }
  }, [captainDetails]);

  const fetchAvailableRides = async () => {
    if (!captainDetails || !captainDetails._id) {
      console.error("Captain ID is undefined");
      return;
    }

    console.log("fetching pending rides");
    try {
      const response = await fetch(`${baseURL}/api/captain/available-rides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: captainAuthToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("ye to aya", data);
      setAvailableRides(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending rides:", error);
      setLoading(false);
    }
  };

  const fetchCancelledRides = async () => {
    if (!captainDetails || !captainDetails._id) {
      console.error("Captain ID is undefined");
      return;
    }

    console.log("fetching cancelled rides");

    try {
      const response = await fetch(`${baseURL}/api/captain/cancelled-rides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: captainAuthToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("ye bhi aya", data);
      setCancelledRides(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cancelled rides:", error);
      setLoading(false);
    }
  };

  const fetchCompletedRides = async () => {
    if (!captainDetails || !captainDetails._id) {
      console.error("Captain ID is undefined");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/captain/completed-rides`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: captainAuthToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCompletedRides(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching completed rides:", error);
      setLoading(false);
    }
  };

  async function confirmRide(ride) {
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
          captainId: captainDetails._id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

    } catch (error) {
      console.error("Failed to confirm ride:", error);
    }
  }


  const checkRideStatus = async (rideId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/rides/is-ride-accepted/${rideId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch ride status");
      }

      const data = await response.json();
      return data.isAccepted; // Access `isAccepted` from JSON response
    } catch (error) {
      console.error("Error checking ride status:", error);
      return false; // Return false on error
    }
  };

  const handleAcceptRide = async (ride) => {
    if (!ride?._id) {
      toast.error("Invalid ride data.");
      return;
    }

    try {
      const isAccepted = await checkRideStatus(ride._id);

      if (isAccepted) {
        toast.error("The ride is already accepted by another captain.");
      } else {
        if (typeof confirmRide === "function") {
          confirmRide(ride);
        } else {
          console.error("confirmRide is not a function");
        }
        navigate("/captain-ride-pop-up", {
          state: { ride: ride },
        });
      }
    } catch (error) {
      console.error("Error checking ride status:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Toaster />
      <RideTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="ride-container">
        {loading ? (
          <p className="loading-text">Loading rides...</p>
        ) : selectedTab === "available" ? (
          availableRides.length === 0 ? (
            <p className="no-rides-text">No pending rides available.</p>
          ) : (
            <div className="ride-grid">
              {availableRides.map((ride) => (
                <div key={ride._id} className="ride-card">
                  {console.log("ye rha", ride)}
                  <h3 className="ride-id">{ride.user.name}</h3>
                  <p>
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p>
                    <strong>Destination:</strong> {ride.destination}
                  </p>
                  <p>
                    <strong>Fare:</strong> ₹{ride.fare}
                  </p>
                  <p>
                    <strong>Distance:</strong> {ride.distance} km
                  </p>
                  <button
                    className="accept-btn"
                    onClick={() => handleAcceptRide(ride)}
                  >
                    Accept Ride
                  </button>
                </div>
              ))}
            </div>
          )
        ) : selectedTab === "cancelled" ? (
          cancelledRides.length === 0 ? (
            <p className="no-rides-text">No cancelled rides available.</p>
          ) : (
            <div className="ride-grid">
              {cancelledRides.map((ride) => (
                <div key={ride._id} className="ride-card cancelled">
                  <h3 className="ride-id">{ride.user.name}</h3>
                  <p>
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p>
                    <strong>Destination:</strong> {ride.destination}
                  </p>
                  <p>
                    <strong>Fare:</strong> ₹{ride.fare}
                  </p>
                  <p>
                    <strong>Distance:</strong> {ride.distance} km
                  </p>
                  <p className="cancel-reason">
                    <strong>Reason:</strong> {ride.cancelReason}
                  </p>
                </div>
              ))}
            </div>
          )
        ) : selectedTab === "completed" ? (
          completedRides.length === 0 ? (
            <p className="no-rides-text">No completed rides available.</p>
          ) : (
            <div className="ride-grid">
              {console.log(completedRides)}
              {completedRides.map((ride) => (
                <div key={ride._id} className="ride-card completed">
                  <h3 className="ride-id">{ride.user.name}</h3>
                  <p>
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p>
                    <strong>Destination:</strong> {ride.destination}
                  </p>
                  <p>
                    <strong>Fare:</strong> ₹{ride.fare}
                  </p>
                  <p>
                    <strong>Distance:</strong> {ride.distance} km
                  </p>
                </div>
              ))}
            </div>
          )
        ) : null}
      </div>
      <CaptainNav />
    </>
  );
};

export default CaptainRides;