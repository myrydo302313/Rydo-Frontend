import { useState } from "react";
import "../styles/RideTabs.css";

export default function RideTabs({ selectedTab, setSelectedTab }) {
  return (
    <div className="ride-tabs-container">
      {/* Tab Options */}
      <div className="tabs">
        {["available", "completed", "cancelled"].map((tab) => (
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
        {selectedTab === "available" && (
          <p>🚗 Browse through all available rides.</p>
        )}
        {selectedTab === "completed" && (
          <p>✅ View your completed ride history.</p>
        )}
        {selectedTab === "cancelled" && <p>❌ Here are your Cancelled rides</p>}
      </div>
    </div>
  );
}
