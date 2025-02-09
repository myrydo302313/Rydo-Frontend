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

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) {
        alert(`No details available for input: '${place.name}'`);
        return;
      }

      const addressComponents = place.address_components;
      const getComponent = (type) =>
        addressComponents?.find((comp) => comp.types.includes(type))?.long_name || "";

      setAddress({
        location: place.formatted_address || "",
        city: getComponent("locality"),
        state: getComponent("administrative_area_level_1"),
        zip: getComponent("postal_code"),
        country: getComponent("country"),
      });
    }
  };

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
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
