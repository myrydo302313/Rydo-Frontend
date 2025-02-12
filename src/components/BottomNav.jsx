import React from "react";
import { Home, Briefcase, User } from "lucide-react";
import "../styles/BottomNav.css"; 
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      {/* Home */}
      <div className="nav-item">
        <Home size={24} />
        <Link to='/home'>Home</Link>
      </div>

      {/* Services */}
      <div className="nav-item">
        <Briefcase size={24} />
        <span>Services</span>
      </div>

      {/* Account */}
      <div className="nav-item">
        <User size={24} />
        <Link to='/userAccount'>Account</Link>
      </div>
    </nav>
  );
};

export default BottomNav;
