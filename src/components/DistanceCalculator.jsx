import React, { useRef, useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];
const apiKey = "AIzaSyCq_Tla0-JKWK_xvYeB8IGSfnI48-Po0is"; // Replace with your API key

const AddressSelection = () => {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null); // Separate ref for the input field

  const [address, setAddress] = useState({
    location: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // Function to extract address components
  const getComponent = (addressComponents, type) =>
    addressComponents?.find((comp) => comp.types.includes(type))?.long_name || "";

  // Function to handle when a place is selected from autocomplete
  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) {
        alert(`No details available for input: '${place.name}'`);
        return;
      }

      setAddress({
        location: place.formatted_address || "",
        city: getComponent(place.address_components, "locality"),
        state: getComponent(place.address_components, "administrative_area_level_1"),
        zip: getComponent(place.address_components, "postal_code"),
        country: getComponent(place.address_components, "country"),
      });
    }
  };

  // Function to handle manual input changes
  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Function to get user's current location
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          if (data.status === "OK") {
            const place = data.results[0]; // Get first formatted address
            setAddress({
              location: place.formatted_address || "",
              city: getComponent(place.address_components, "locality"),
              state: getComponent(place.address_components, "administrative_area_level_1"),
              zip: getComponent(place.address_components, "postal_code"),
              country: getComponent(place.address_components, "country"),
            });
          } else {
            alert("Failed to get location. Try again.");
          }
        },
        (error) => {
          alert("Geolocation failed: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div className="address-container">
        <h2>Address Selection</h2>

        {/* Wrap only the Address Input with Autocomplete */}
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            ref={inputRef} // Ensure this input is linked to autocomplete
            type="text"
            name="location"
            placeholder="Enter Address"
            value={address.location}
            onChange={handleInputChange}
            autoComplete="off" // Prevent browser auto-fill interference
          />
        </Autocomplete>

        {/* Button to get current location */}
        <button onClick={handleGetCurrentLocation}>Use Current Location</button>

        {/* Other fields are outside Autocomplete */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip Code"
          value={address.zip}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <button>Checkout</button>
      </div>
    </LoadScript>
  );
};

export default AddressSelection;
