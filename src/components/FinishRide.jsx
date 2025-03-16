import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const FinishRide = (props) => {
  const navigate = useNavigate();

  const {captainAuthToken}=useAuth();

  async function endRide() {
    try {
      const response = await fetch(
        `${baseURL}/api/rides/end-ride`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: captainAuthToken,
          },
          body: JSON.stringify({ rideId: props.ride._id }),
        }
      );

      if (response.ok) {
        navigate("/captain-ride-final", { state: { rideDetails: props.ride } });
      } else {
        console.error("Failed to end ride");
      }
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  }

  return (
    <div>
      <img src="/images/captain-riding.jpg" alt="" width={550} />
      <h3 className="text-2xl font-semibold mb-5" align='center'>Finish this Ride</h3>
      <div className="flex items-center justify-between p-4  bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="/images/profilePic.jpg"
            alt="User"
          />
          <h2 className="text-lg font-medium">{props.ride?.user.name}</h2>
        </div>
        <h5 className="text-lg font-semibold">{props.ride?.distance} Km</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props.ride?.pickup.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props.ride?.destination.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash / UPI</p>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full">
          <button
            onClick={endRide}
            className="w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
