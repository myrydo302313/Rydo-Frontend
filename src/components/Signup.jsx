import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import '../styles/Signup.css'
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.vercel.app";

// import "../styles/Signup.css";

const Signup = ({ check, setCheck }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading,setLoading]=useState(false);

  const { storeTokenInLS } = useAuth();

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

    try {
      setLoading(true)
      const response = await fetch(`${baseURL}/api/auth/register`, {
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
      setLoading(false)
      toast.success("Registration successful!");
      storeTokenInLS(responseData.token);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });

      setTimeout(() => navigate("/"), 2000);

    } catch (e) {
      console.log("Error:", e);
      setLoading(false)
    }
  };

  useEffect(()=>{
    console.log(formData)
  },[formData])

  return (
    <>
      <Toaster />
      <div className="signup-container">
        <h1 className="signup-heading-color">Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
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
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="123-456-7890"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          {/* Role Selection */}
          <div className="form-group">
            <label htmlFor="role">Register as:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="driver">Driver</option>
            </select>
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
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <div className="user-check">
            <button onClick={() => setCheck(!check)}>Already a user</button>
          </div>
          <button type="submit" className="signup-button">
            {loading?'Signing Up...':'Sign Up'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
