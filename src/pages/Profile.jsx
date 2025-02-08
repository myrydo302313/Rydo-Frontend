import React, { useState } from "react";
import Signup from "../components/Signup";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Login from "../components/Login";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import Home from "./Home";
import UserProfile from "../components/UserProfile";
// import '../styles/Profile.css'

const Profile = () => {
  const [check, setCheck] = useState(false);

  const { user, isLoggedIn } = useAuth();
  const User = user?.userData;

  return (
    <>
      <Navbar />

      {isLoggedIn ? (
        <UserProfile/>
      ) : (
        <>
          {check ? (
            <Signup check={check} setCheck={setCheck} />
          ) : (
            <Login check={check} setCheck={setCheck} />
          )}
        </>
      )}

      {/* {User && User.isAdmin && (
        <div className="profile-admin-btn">
          <Link to="/admin">
            <button>
              Open Admin Panel
            </button>
          </Link>
        </div>
      )} */}

      {/* {User && User.isDriver && (
        <div className="profile-admin-btn">
          <Link to="/driver">
            <button>
              Open Driver Panel
            </button>
          </Link>
        </div>
      )} */}

      {/* {User && User.role=='vendor' && (
        <div className="profile-admin-btn">
          <Link to="/vendor">
            <button>
              Open Vendor Panel
            </button>
          </Link>
        </div>
      )} */}



      <section className="social-links">
        <SocialLinks />
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Profile;
