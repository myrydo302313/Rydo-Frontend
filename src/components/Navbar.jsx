import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showMenu]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="navbar-main">
        <nav className="navbar">
          <div className="logo-img">
            <img src="/images/logo.png" width={100} alt="Logo" />
            {/* <div className="logo" style={{ color: "black" }}>
              Rydo
            </div> */}
          </div>

          <ul className={showMenu ? "menu-nav-links" : "nav-links"}>
            <li className={showMenu ? "menu-nav-item" : "nav-item"}>
              <Link to="/">Home</Link>
            </li>
            <li className={showMenu ? "menu-nav-item" : "nav-item"}>
              <Link to="/ride">Ride</Link>
            </li>

            {/* Services Dropdown */}
            <li
              className={showMenu ? "menu-nav-item" : "nav-item services"}
              onClick={toggleDropdown} // Toggle on click for mobile
            >
              <Link>Services</Link>
              {showDropdown && (
                <ul className="dropdown">
                  <li>
                    <Link to="/ride">Ride</Link>
                  </li>
                  <li>
                    <Link to="/pickUp">Pick-Up</Link>
                  </li>
                  <li>
                    <Link to="/drivers">Drivers</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className={showMenu ? "menu-nav-item" : "nav-item"}>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className={showMenu ? "menu-nav-item" : "nav-item"}>
              <Link to="/about">About Us</Link>
            </li>

            <li className={showMenu ? "menu-nav-item" : "nav-item"}>
              <Link to="/contact">Contact Us</Link>
            </li>


            <li className={showMenu ? "menu-nav-item" : "nav-item"}>
              <Link to="/profile">
                <CgProfile style={{ fontSize: "30px" }} />
              </Link>
            </li>

            <li>
              <button
                className="ham-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <GiHamburgerMenu />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
