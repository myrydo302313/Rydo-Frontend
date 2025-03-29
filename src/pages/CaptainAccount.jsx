import React, { useEffect, useState } from "react";
import CaptainNav from "../components/CaptainNav";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import "../styles/CaptainAccount.css";
import PaymentComponent from "../components/PaymentComponent";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const CaptainAccount = () => {
  const [currUser, setCurrUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState("");

  const { captain, logoutCaptain, captainAuthToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrUser(captain?.captainData);
  }, [captain]);

  const handleLogout = () => {
    logoutCaptain();
    navigate("/captainLogin");
  };

  const handleFileChange = (e, type) => {
    setSelectedFile(e.target.files[0]);
    setUploadType(type);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile || !uploadType) {
      toast.error("Please select a file first.");
      return;
    }

    if (!captainAuthToken) {
      toast.error("Authentication failed! Please log in again.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        `${baseURL}/api/documents/upload-${uploadType}`,
        {
          method: "POST",
          headers: {
            Authorization: captainAuthToken,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(`${uploadType.toUpperCase()} uploaded successfully!`);
        setCurrUser((prev) => ({ ...prev, [uploadType]: result.imageUrl }));
      } else {
        console.error("Backend error response:", result);
        toast.error(result.message || "Upload failed.");
      }
    } catch (error) {
      console.error("Error in fetch:", error);
      toast.error("An error occurred. Try again.");
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <>
      <Toaster />
      <div className="profile-main">
        <div className="user-photo">
          {currUser?.profilePic ? (
            <img
              src={currUser.profilePic}
              alt="Profile"
              className="profile-pic"
              width={60}
              height={60}
            />
          ) : (
            <span>No Profile Photo</span>
          )}
        </div>
        <div className="user-name">{currUser?.name}</div>
        <div className="user-phone">{currUser?.phone}</div>
      </div>

      <div className="pay-commission">
        <h3>Pay Your Commission To Stay Active</h3>
        {currUser?.commission > 0 ? (
          <PaymentComponent amt={currUser?.commission} />
        ) : (
          <span>No Commission to pay</span>
        )}
      </div>

      <div className="profile-menu">
        <div className="profile-menu-option">
          <img src="/images/help.png" alt="Help" width={25} height={25} />
          <Link to="/captain-help">Help</Link>
        </div>
        {/* <div className="profile-menu-option">
              <img
                src="/images/payment.png"
                alt="Help"
                width={25}
                height={25}
              />
              <p>Payment</p>
            </div> */}
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
          <Link to="/captain-feedback">Feedback</Link>
        </div>
        <div className="profile-menu-option">
          <img src="/images/contact.png" alt="Help" width={25} height={25} />
          <Link to="/captain-contact-us">Contact Us</Link>
        </div>
      </div>

      <div className="logout-btn-div">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="captain-documents">
        <h2 className="doc-title">Upload Your Documents</h2>

        {[
          { label: "Profile Photo", key: "profilePic" },
          { label: "Aadhaar Card", key: "aadhaar" },
          { label: "Driver's License", key: "dl" },
        ].map(({ label, key }) => (
          <div className="doc-card" key={key}>
            <div className="doc-info">
              <span className="doc-label">{label}:</span>
              {currUser?.[key] ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(currUser[key], "_blank");
                  }}
                  className="view-doc"
                >
                  View {label}
                </a>
              ) : (
                <span className="not-uploaded">Not Uploaded</span>
              )}
            </div>
            {!currUser?.[key] && (
              <div className="upload-section">
                <label htmlFor={key} className="file-label">
                  <img
                    src="/images/upload-icon.png"
                    alt="Upload"
                    className="upload-icon"
                  />
                  Choose File
                </label>
                <input
                  type="file"
                  id={key}
                  className="file-input"
                  onChange={(e) => handleFileChange(e, key)}
                />
                {selectedFile && uploadType === key && (
                  <p className="selected-file">Selected: {selectedFile.name}</p>
                )}
                <button
                  className="upload-btn"
                  onClick={handleFileUpload}
                  disabled={loading || !selectedFile || uploadType !== key}
                >
                  {loading ? "Uploading..." : `Upload ${label}`}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <CaptainNav />
    </>
  );
};

export default CaptainAccount;
