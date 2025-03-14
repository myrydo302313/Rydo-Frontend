import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import BottomNav from "../components/BottomNav";
import "../styles/UserAccount.css";
import { useNavigate } from "react-router-dom";
import PaymentComponent from "../components/PaymentComponent";

const UserAccount = () => {
  const [currUser, setCurrUser] = useState({});

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
      <PaymentComponent />
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
          <img src="/images/payment.png" alt="Help" width={25} height={25} />
          <p>Payment</p>
        </div>
        <div className="profile-menu-option">
          <img src="/images/rides.png" alt="Help" width={25} height={25} />
          <p>My Rides</p>
        </div>
        <div className="profile-menu-option">
          <img src="/images/rewards.png" alt="Help" width={25} height={25} />
          <p>My Rewards</p>
        </div>
        <div className="profile-menu-option">
          <img src="/images/feedback.png" alt="Help" width={25} height={25} />
          <p>Feedback</p>
        </div>
        <div className="profile-menu-option">
          <img src="/images/contact.png" alt="Help" width={25} height={25} />
          <p>Contact Us</p>
        </div>
      </div>

      <div className="logout-btn-div">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="register-as-captain">
        <div className="para-part">
          <p className="cap-main-head">Drive with Rydo and Earn</p>
          <p>Become a Captain!</p>
        </div>
        <img src="/images/captainSignUp.jpg" alt="" width={100} height={40} />
      </div>

      <BottomNav />
    </>
  );
};

export default UserAccount;
