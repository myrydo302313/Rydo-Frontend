import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css"; // Ensure this file is present

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/api/auth/request-password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        toast.error(errorData.message || "Failed to send reset email!");
        return;
      }

      const data = await response.json();
      toast.success(data.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      toast.error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="forgot-password__container">
      <Toaster />
      <div className="forgot-password__box">
        <h2 className="forgot-password__title">Forgot Password?</h2>
        <p className="forgot-password__description">
          No worries! Enter your email below and we'll send you a reset link.
        </p>
        <form onSubmit={handleSubmit} className="forgot-password__form">
          <div className="forgot-password__form-group">
            <label htmlFor="email" className="forgot-password__label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="forgot-password__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgot-password__button">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
