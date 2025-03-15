import React, { useState, useEffect } from "react";
import "../../styles/AdminNavbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);



  return (
    <>
      <div className="navbar-main">
        <nav className="navbar">
          <div className="logo-img-admin">
            <img src="/images/rydoLogo3.png" width={70} alt="Logo" />
            <div className="logo" style={{ color: "white" }}>
              Rydo
            </div>
          </div>
          <div className="nav-options">
            <Link to="/admin" className="nav-option">
              Home
            </Link>
            <Link to="/admin/users" className="nav-option">
              Users
            </Link>
            <Link to="/admin/captains" className="nav-option">
              Captains
            </Link>
            <Link to="/admin/rides" className="nav-option">
              Rides
            </Link>
            
          </div>
        </nav>
      </div>
    </>
  );
};

export default AdminNavbar;
