import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../styles/ConfirmRidePopUp.css";
import { SocketContext } from "../context/SocketContext";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const ConfirmRidePopUp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { captainAuthToken } = useAuth();
  const { socket } = useContext(SocketContext);

  const location = useLocation();
  const { ride } = location.state || {};

  const callPassenger = () => {
    window.open(`tel:${ride?.user.phone}`, "_self");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${baseURL}/api/rides/start-ride?rideId=${encodeURIComponent(
          ride._id
        )}&otp=${encodeURIComponent(otp)}`,
        {
          method: "GET",
          headers: {
            Authorization: captainAuthToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Get latitude & longitude
      const pickupLat = ride.pickupLocation.latitude;
      const pickupLng = ride.pickupLocation.longitude;
      const destLat = ride.destinationLocation.latitude;
      const destLng = ride.destinationLocation.longitude;

      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${pickupLat},${pickupLng}&destination=${destLat},${destLng}&travelmode=driving`;

      window.open(googleMapsUrl, "_blank");

      navigate("/captain-riding", { state: { ride: ride } });
    } catch (error) {
      console.error("Error starting ride:", error);
    }
  };

  useEffect(() => {
    socket.on("ride-cancelled", (data) => {
      console.log("Ride cancelled event received 🚗");
      navigate("/captainHome");
    });

    return () => {
      socket.off("ride-cancelled"); 
    };
  }, [socket]);

  const cancelRideHandler = async () => {
    try {
      if (!ride || !ride._id) {
        alert("Ride ID is missing. Cannot cancel the ride.");
        return;
      }

      console.log("Cancelling ride with ID:", ride._id);

      const response = await fetch(
        `${baseURL}/api/rides/cancel-ride?rideId=${encodeURIComponent(
          ride._id
        )}`,
        {
          method: "POST", 
          headers: {
            Authorization: captainAuthToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rideId: ride._id }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Ride cancelled successfully:", data);
      alert("Ride has been cancelled successfully!");
      navigate("/captainHome");
    } catch (error) {
      console.error("Error cancelling ride:", error);
      alert("Failed to cancel ride. Please try again.");
    }
  };

  return (
    <div className="confirm-ride-popup">
      {console.log("ye le bhai", ride)}
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between p-3 border-2 bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="/images/profilePic.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">{ride?.user?.name}</h2>
        </div>
        <h5 className="text-lg font-semibold">{ride?.user?.distance}</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {ride?.pickup.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {ride?.destination.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
          {ride?.user.phone && (
            <p className="text-blue-600 font-medium underline mt-2">
              <span
                onClick={callPassenger}
                className="call-captain-btn cursor-pointer"
              >
                📞 Call Passenger
              </span>
            </p>
          )}
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />

            <button className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
              Confirm
            </button>
            <button
              onClick={(e) => {
                // props.setConfirmRidePopupPanel(false);
                // props.setRidePopupPanel(false);
                // props.cancelRide();
                e.preventDefault();
                cancelRideHandler();
              }}
              className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
