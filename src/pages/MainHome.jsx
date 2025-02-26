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
