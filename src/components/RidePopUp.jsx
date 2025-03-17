import { toast, Toaster } from "react-hot-toast";
import { CloudCog } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const RidePopUp = (props) => {
  const navigate = useNavigate();
const { captain, captainAuthToken } = useAuth();
const captainData = captain?.captainData || {};
  async function confirmRide() {
    if (
      props.ride.pickupLocation &&
      props.ride.pickupLocation.latitude &&
      props.ride.pickupLocation.longitude
    ) {
      const { latitude, longitude } = props.ride.pickupLocation;

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
          rideId: props.ride._id,
          captainId: captainData._id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log("Yaha agya:", "ab dekho");

      props.setConfirmRidePopupPanel(true);
      props.setRidePopupPanel(false);
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

  const handleAcceptRide = async () => {
    if (!props.ride?._id) {
      toast.error("Invalid ride data.");
      return;
    }

    try {
      const isAccepted = await checkRideStatus(props.ride._id);

      if (isAccepted) {
        toast.error("The ride is already accepted by another captain.");

        setTimeout(() => {
          props.setRidePopupPanel(false);
        }, 4000); // Delay execution by 4 seconds
      } else {

        // props.confirmRide();
        confirmRide();
        navigate("/captain-ride-pop-up", {
          state: { ride: props.ride }, 
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
      <div>
        {console.log(props.ride)}
        <h5
          className="p-1 text-center w-[93%] absolute top-0"
          onClick={() => {
            props.setRidePopupPanel(false);
          }}
        >
          <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

        <div className="flex items-center justify-between p-3 rounded-lg mt-4 bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb]">
          <div className="flex items-center gap-3">
            <img
              className="h-12 rounded-full object-cover w-12"
              src="/images/profilePic.jpg"
              alt=""
            />
            <h2 className="text-lg font-medium">{props.ride?.user?.name}</h2>
          </div>
          <h5 className="text-lg font-semibold">{props.ride?.distance}km</h5>
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
                <h3 className="text-lg font-medium">₹{props.ride?.fare} </h3>
                <p className="text-sm -mt-1 text-gray-600">Cash/UPI</p>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full">
            <button
              onClick={handleAcceptRide}
              className=" bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
            >
              Accept
            </button>

            <button
              onClick={() => {
                props.setRidePopupPanel(false);
              }}
              className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RidePopUp;
