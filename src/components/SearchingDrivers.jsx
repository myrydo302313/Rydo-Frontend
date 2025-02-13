import React from "react";
import "../styles/SearchingDrivers.css"; // Custom CSS (optional)

const SearchingDrivers = ({ pickup, destination, fare, vehicleType }) => {
  return (
    <div className="relative p-5 bg-white shadow-lg rounded-lg">
      {/* Close Button */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          // props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line cursor-pointer"></i>
      </h5>

      {/* Searching Text with Animation */}
      <h3 className="text-2xl font-semibold mb-5 text-center animate-pulse">
        Looking for a Driver...
      </h3>

      {/* Animated Spinning Loader */}
      <div className="flex justify-center items-center mb-3">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>

      {/* Image & Details */}
      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20 animate-bounce"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill text-blue-500 animate-ping"></i>
            <div>
              <h3 className="text-lg font-medium">{pickup.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill text-red-500 animate-ping"></i>
            <div>
              <h3 className="text-lg font-medium">
                {destination.split(",")[0]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line text-green-500"></i>
            <div>
              <h3 className="text-lg font-medium">₹{fare[vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchingDrivers;
