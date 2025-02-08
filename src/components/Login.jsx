import React, { useState, useContext } from "react";
// import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import '../styles/Login.css'
import { useAuth } from "../store/auth";
const baseURL =
  process.env.REACT_APP_BASE_URL || "http://rydo-backend.vercel.app";

const Login = ({ check, setCheck }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false); 

  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed!");
        return;
      }

      const data = await response.json();
      console.log("Response Data:", data);

      toast.success("Login Successful!");
      storeTokenInLS(data.token);

      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Toaster />
      <div className="signup-container">
        <h1 className="signup-heading-color">Login</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={passwordVisible ? "text" : "password"} 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
            >
              {passwordVisible ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <div className="user-check">
            <button type="button" onClick={() => setCheck(!check)}>
              New here
            </button>
          </div>
          <button type="submit" className="signup-button">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
