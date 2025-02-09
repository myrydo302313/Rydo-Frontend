import { useState } from "react";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.vercel.app";

const GetDistance = () => {
  const { authorizationToken } = useAuth();
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState("");

  // Fetch current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `${baseURL}/api/maps/get-current-location?lat=${latitude}&lng=${longitude}`,
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
            setLocation1(data.location);
            setError("");
          } else {
            setError(data.error || "Unable to fetch current location");
          }
        } catch (err) {
          setError("Error fetching current location");
        }
      },
      (error) => {
        setError("Unable to retrieve location. Please allow location access.");
      }
    );
  };

  // Fetch suggestions from backend
  const fetchSuggestions = async (query, setSuggestions) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `${baseURL}/api/maps/get-suggestions?input=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      setSuggestions(data || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  // Fetch distance from backend
  const fetchDistance = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/maps/get-distance-time?origin=${encodeURIComponent(
          location1
        )}&destination=${encodeURIComponent(location2)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "OK") {
        setDistance(data.distance.text);
        setDuration(data.duration.text);
        setError("");
      } else {
        setError(data.message || "Could not fetch distance");
        setDistance(null);
        setDuration(null);
      }
    } catch (err) {
      setError("Error fetching distance");
      setDistance(null);
      setDuration(null);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location1.length < 3 || location2.length < 3) {
      setError("Both locations must be at least 3 characters long");
      return;
    }
    fetchDistance();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Get Distance & Travel Time</h2>
      <form onSubmit={handleSubmit}>
        {/* Location 1 Input */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: "10px" }}>
          <input
            type="text"
            value={location1}
            onChange={(e) => {
              setLocation1(e.target.value);
              fetchSuggestions(e.target.value, setSuggestions1);
            }}
            placeholder="Enter first location"
            style={{ padding: "8px", width: "300px", marginRight: "10px" }}
          />
          <button
            type="button"
            onClick={getCurrentLocation}
            style={{
              padding: "8px",
              marginLeft: "5px",
              cursor: "pointer",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Use Current Location
          </button>
          {suggestions1.length > 0 && (
            <ul
              style={{
                position: "absolute",
                background: "white",
                border: "1px solid #ccc",
                listStyle: "none",
                padding: "5px",
                margin: "0",
                width: "300px",
                maxHeight: "150px",
                overflowY: "auto",
                zIndex: 1000,
              }}
            >
              {suggestions1.map((suggestion, index) => (
                <li
                  key={index}
                  style={{ padding: "5px", cursor: "pointer" }}
                  onClick={() => {
                    setLocation1(suggestion);
                    setSuggestions1([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Location 2 Input */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: "10px" }}>
          <input
            type="text"
            value={location2}
            onChange={(e) => {
              setLocation2(e.target.value);
              fetchSuggestions(e.target.value, setSuggestions2);
            }}
            placeholder="Enter second location"
            style={{ padding: "8px", width: "300px", marginRight: "10px" }}
          />
          {suggestions2.length > 0 && (
            <ul
              style={{
                position: "absolute",
                background: "white",
                border: "1px solid #ccc",
                listStyle: "none",
                padding: "5px",
                margin: "0",
                width: "300px",
                maxHeight: "150px",
                overflowY: "auto",
                zIndex: 1000,
              }}
            >
              {suggestions2.map((suggestion, index) => (
                <li
                  key={index}
                  style={{ padding: "5px", cursor: "pointer" }}
                  onClick={() => {
                    setLocation2(suggestion);
                    setSuggestions2([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" style={{ padding: "8px 15px" }}>Calculate</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {distance && duration && (
        <div style={{ marginTop: "20px" }}>
          <h4>Distance: {distance}</h4>
          <h4>Estimated Time: {duration}</h4>
        </div>
      )}
    </div>
  );
};

export default GetDistance;
