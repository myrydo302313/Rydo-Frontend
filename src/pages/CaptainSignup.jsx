import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../styles/CaptainSignup.css";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.vercel.app";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleType: "",
    vehicleNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const { storeCaptainToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!formData.vehicleType) {
      toast.error("Please select a vehicle type!");
      return;
    }

    if (!formData.vehicleNumber) {
      toast.error("Please enter your vehicle number!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/api/auth/captainRegister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Response from backend:", responseData);

      if (!response.ok) {
        toast.error(responseData.message || "Registration failed!");
        return;
      }

      setLoading(false);
      toast.success("Registration successful!");
      storeCaptainToken(responseData.token);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        vehicleType: "",
        vehicleNumber: "",
      });

      setTimeout(() => navigate("/captainHome"), 2000);
    } catch (e) {
      console.log("Error:", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <Toaster />
      <div className="captain-signup-container">
        <div className="captain-signup-top">
          <img src="/images/rydoLogo3.png" alt="Logo" width={80} />
          <h2>Rydo</h2>
        </div>
        <div className="captain-signup-hero">
          <form onSubmit={handleSubmit} className="captain-signup-form">
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="vehicleType">Vehicle Type:</label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="auto">Auto</option>
                <option value="car">Car</option>
                <option value="two-wheeler">Two-Wheeler</option>
              </select>
            </div>
            <div>
              <label htmlFor="vehicleNumber">Vehicle Number:</label>
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
              />
            </div>
            <p>
              Already a captain?{" "}
              <Link className="captain-login-btn" to="/captainLogin">
                Login
              </Link>
            </p>
            <button type="submit" className="captain-signup-button">
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CaptainSignup;
