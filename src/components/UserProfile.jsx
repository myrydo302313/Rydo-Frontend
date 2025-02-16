import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
// import "../styles/UserProfile.css";
import { useAuth } from "../store/auth";
import Navbar from "../components/Navbar";
import '../styles/UserProfile.css'
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();
  const [userDetails, setUserDetails] = useState();
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [uploadStatus, setUploadStatus] = useState(""); // Status message for upload
  const [image, setImage] = useState(null);
  const [loading2, setLoading2] = useState(false);

  const { authorizationToken } = useAuth();

  useEffect(() => {
    if (user && user.userData) {
      setUserDetails(user.userData);
    }
  }, [user]);

  useEffect(() => {
    if (userDetails) {
      console.log("Updated user details:", userDetails);
    }
  }, [userDetails]);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <p>Loading..</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>User Profile</h2>
          </div>
          <div className="profile-info">
            <div className="profile-detail">
              <span className="label">Name:</span>
              <span className="value">
                {userDetails.name || "Not Available"}
              </span>
            </div>
            <div className="profile-detail">
              <span className="label">Email:</span>
              <span className="value">
                {userDetails.email || "Not Available"}
              </span>
            </div>
            <div className="profile-detail">
              <span className="label">Phone:</span>
              <span className="value">
                {userDetails.phone || "Not Available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
