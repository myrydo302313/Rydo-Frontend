import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ResetPassword.css"; // Ensure this file is present

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        toast.error(errorData.message || "Failed to reset password!");
        return;
      }

      const data = await response.json();
      toast.success(data.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="reset-password__container">
      <Toaster />
      <div className="reset-password__box">
        <h2 className="reset-password__title">Reset Password</h2>
        <p className="reset-password__description">
          Enter your new password below to reset your account.
        </p>
        <form onSubmit={handleSubmit} className="reset-password__form">
          <div className="reset-password__form-group">
            <label htmlFor="newPassword" className="reset-password__label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="reset-password__input"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-password__button">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
