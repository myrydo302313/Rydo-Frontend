import React from "react";
import { Home, Briefcase, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/BottomNav.css";

const CaptainNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${
          location.pathname === "/captainHome" ? "active" : ""
        }`}
        onClick={() => navigate("/captainHome")}
      >
        <div className="nav-icon">
          <Home size={24} />
        </div>
        <span>Home</span>
      </div>

      <div
        className={`nav-item ${
          location.pathname === "/captain-rides" ? "active" : ""
        }`}
        onClick={() => navigate("/captain-rides")}
      >
        <div className="nav-icon">
          <Briefcase size={24} />
        </div>
        <span>Rides</span>
      </div>

      {/* Account */}
      <div
        className={`nav-item ${
          location.pathname === "/captain-account" ? "active" : ""
        }`}
        onClick={() => navigate("/captain-account")}
      >
        <div className="nav-icon">
          <User size={24} />
        </div>
        <span>Account</span>
      </div>
    </nav>
  );
};

export default CaptainNav;