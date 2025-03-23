import React, { useEffect, useState } from "react";

import "../styles/MainHome.css";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const MainHome = () => {
  const [who, setWho] = useState("user");
  const [isWebView, setIsWebView] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const { isUserLoggedIn, isCaptainLoggedIn } = useAuth();

  useEffect(() => {
    if (isCaptainLoggedIn) {
      setWho("captain");
    }
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent || "";

    // Check if the user is inside WebView
    if (
      /Android/i.test(userAgent) &&
      (userAgent.includes("wv") || userAgent.includes("Version/"))
    ) {
      setIsWebView(true);
    }
  }, []);

  return (
    <>
      <div className="main-home">
        <div className="main-home-top">
          <img src="/images/rydoLogo3.png" alt="" />
          <p className="main-home-subhead1">Skip The Wait</p>
          <p className="main-home-subhead2">Ride With Us</p>
          <div>
            {!isWebView && showBanner && (
              <div className="popup-banner-app">
                <span>Book Ride with Rydo App Now</span>
                <a href="/Rydo.apk" download className="download-button">
                  Download
                </a>
              </div>
            )}
          </div>
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
