import React from "react";
import { Home, Briefcase, User } from "lucide-react";
import "../styles/BottomNav.css";
import { Link, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <nav className="bottom-nav" >
      {/* Home */}
      <div className="nav-item" onClick={()=>navigate('/home')}>
        <Home size={24} />
        <span>Home</span>
      </div>

      {/* Services */}
      <div className="nav-item">
        <Briefcase size={24} />
        <span>Services</span>
      </div>

      {/* Account */}
      <div className="nav-item" onClick={()=>navigate('/userAccount')}>
        <User size={24} />
        <span>Account</span>
      </div>
    </nav>
  );
};

export default BottomNav;
