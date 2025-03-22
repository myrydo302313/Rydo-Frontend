import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import BottomNav from "../components/BottomNav";
import "../styles/UserAccount.css";
import { Link, useNavigate } from "react-router-dom";
import PaymentComponent from "../components/PaymentComponent";
import ContentLoader from "react-content-loader";

const UserAccount = () => {
  const [currUser, setCurrUser] = useState({});
  // const [loading, setLoading] = useState(true);

  const { user, logoutUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setCurrUser(user?.userData);
  });

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      {loading ? (
        <ContentLoader
          speed={20}
          width="100%"
          height="100vh"
          viewBox="0 0 400 800"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {/* Header */}
          <rect x="10" y="20" rx="4" ry="4" width="80%" height="40" />

          {/* Multiple content lines */}
          <rect x="10" y="80" rx="4" ry="4" width="90%" height="20" />
          <rect x="10" y="120" rx="4" ry="4" width="85%" height="20" />
          <rect x="10" y="160" rx="4" ry="4" width="95%" height="20" />

          {/* Placeholder for an image */}
          <rect x="10" y="220" rx="10" ry="10" width="100%" height="300" />

          {/* Footer */}
          <rect x="10" y="540" rx="4" ry="4" width="60%" height="20" />
        </ContentLoader>
      ) : (
        <>
          <div className="profile-main">
            <div className="user-name">{currUser?.name}</div>
            <div className="user-phone">{currUser?.phone}</div>
          </div>
          <div className="profile-menu">
            <div className="profile-menu-option">
              <img src="/images/help.png" alt="Help" width={25} height={25} />
              <p>Help</p>
            </div>
            <div className="profile-menu-option">
              <img
                src="/images/payment.png"
                alt="Help"
                width={25}
                height={25}
              />
              <p>Payment</p>
            </div>
            <div className="profile-menu-option">
              <img src="/images/rides.png" alt="Help" width={25} height={25} />
              <p>My Rides</p>
            </div>
            <div className="profile-menu-option">
              <img
                src="/images/rewards.png"
                alt="Help"
                width={25}
                height={25}
              />
              <p>My Rewards</p>
            </div>
            <div className="profile-menu-option">
              <img
                src="/images/feedback.png"
                alt="Help"
                width={25}
                height={25}
              />
              <Link to="/feedback">Feedback</Link>
            </div>
            <div className="profile-menu-option">
              <img
                src="/images/contact.png"
                alt="Help"
                width={25}
                height={25}
              />
              <Link to="/contact-us">Contact Us</Link>
            </div>
          </div>
          <div className="logout-btn-div">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div
            className="register-as-captain"
            onClick={() => {
              navigate("/captainLogin");
            }}
          >
            <div className="para-part">
              <p className="cap-main-head">Drive with Rydo and Earn</p>
              <p>Become a Captain!</p>
            </div>
            <img src="/images/new-driver.png" alt="" width={100} height={40} />
          </div>
          <BottomNav />
        </>
      )}
    </>
  );
};

export default UserAccount;
