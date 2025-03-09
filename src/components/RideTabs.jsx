import { useState } from "react";
import "../styles/RideTabs.css";

export default function RideTabs() {
  const [selectedTab, setSelectedTab] = useState("available");

  return (
    <div className="ride-container">
      {/* Tab Options */}
      <div className="tabs">
        {["available", "pending", "completed"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Rides
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {selectedTab === "available" && <p>🚗 Browse through all available rides.</p>}
        {selectedTab === "pending" && <p>⏳ Here are your pending ride requests.</p>}
        {selectedTab === "completed" && <p>✅ View your completed ride history.</p>}
      </div>
    </div>
  );
}
