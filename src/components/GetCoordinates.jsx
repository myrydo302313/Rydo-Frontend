import { useState } from "react";
import { useAuth } from "../store/auth";

const GetCoordinates = () => {

  const {authorizationToken}=useAuth();
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState("");

  const fetchCoordinates = async () => {
    try {
      const response = await fetch(
        `http://localhost:2313/api/maps/get-coordinates?address=${encodeURIComponent(address)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken, 
          },
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        setCoordinates(data);
        setError("");
      } else {
        setError(data.message || "Could not fetch coordinates");
        setCoordinates(null);
      }
    } catch (err) {
      setError("Error fetching coordinates");
      setCoordinates(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.length < 3) {
      setError("Address must be at least 3 characters long");
      return;
    }
    fetchCoordinates();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Get Coordinates</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter location"
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 15px" }}>Get</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {coordinates && (
        <div style={{ marginTop: "20px" }}>
          <h4>Latitude: {coordinates.ltd}</h4>
          <h4>Longitude: {coordinates.lng}</h4>
        </div>
      )}
    </div>
  );
};

export default GetCoordinates;
