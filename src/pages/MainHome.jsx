import React from "react";

import "../styles/MainHome.css";
import { Link } from "react-router-dom";

const MainHome = () => {
  return (
    <>
      <div className="main-home">
        <div className="main-home-top">
          <img src="/images/rydoLogo3.png" alt="" />
          <p className="main-home-subhead1">Skip The Wait</p>
          <p className="main-home-subhead2">Ride With Us</p>
        </div>
        <div className="main-home-bottom">
          <Link to="/profile" className="main-home-btn">
            Continue
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainHome;
