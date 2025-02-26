import React from "react";
import { Home, Briefcase, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/BottomNav.css";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {/* Home */}
      <div
        className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}
        onClick={() => navigate("/home")}
      >
        <div className="nav-icon">
          <Home size={24} />
        </div>
        <span>Home</span>
      </div>

      {/* Services (No Active Highlight) */}
      <div
        className={`nav-item ${location.pathname === "/services" ? "active" : ""}`}
        onClick={() => navigate("/services")}
      >
        <div className="nav-icon">
          <Briefcase size={24} />
        </div>
        <span>Services</span>
      </div>

      {/* Account */}
      <div
        className={`nav-item ${
          location.pathname === "/userAccount" ? "active" : ""
        }`}
        onClick={() => navigate("/userAccount")}
      >
        <div className="nav-icon">
          <User size={24} />
        </div>
        <span>Account</span>
      </div>
    </nav>
  );
};

export default BottomNav;
