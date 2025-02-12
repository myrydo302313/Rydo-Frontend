import React from "react";
import { Home, Briefcase, User } from "lucide-react";
import "../styles/BottomNav.css"; 

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      {/* Home */}
      <div className="nav-item">
        <Home size={24} />
        <span>Home</span>
      </div>

      {/* Services */}
      <div className="nav-item">
        <Briefcase size={24} />
        <span>Services</span>
      </div>

      {/* Account */}
      <div className="nav-item">
        <User size={24} />
        <span>Account</span>
      </div>
    </nav>
  );
};

export default BottomNav;
