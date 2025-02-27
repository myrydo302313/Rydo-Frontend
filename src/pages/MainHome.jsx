import React, { useEffect, useState } from "react";

import "../styles/MainHome.css";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const MainHome = () => {
  const [who, setWho] = useState("user");

  const { isUserLoggedIn, isCaptainLoggedIn } = useAuth();

  useEffect(() => {
    if (isCaptainLoggedIn) {
      setWho("captain");
    }
  }, []);

  return (
    <>
      <div className="main-home">
        <div className="main-home-top">
          <img src="/images/rydoLogo3.png" alt="" />
          <p className="main-home-subhead1">Skip The Wait</p>
          <p className="main-home-subhead2">Ride With Us</p>
        </div>
        <div className="main-home-bottom">
          {who == "captain" ? (
            <Link to="/captainHome" className="main-home-btn">
              Continue
            </Link>
          ) : (
            <Link to="/home" className="main-home-btn">
              Continue
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default MainHome;
