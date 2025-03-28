import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import "../styles/Login.css";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { storeCaptainToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/api/auth/captainLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed!");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Response Data:", data);

      setLoading(false);
      storeCaptainToken(data.token);

      setFormData({ email: "", password: "" });
      navigate("/captainHome");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="login-main">
        <div className="login-top">
          <img src="/images/rydoLogo3.png" alt="Rydo Logo" width={80} />
          <h2>Rydo Captain</h2>
        </div>
        <div className="login-hero">
          <div>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-pair">
                <label htmlFor="email">What's your email :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="login-form-pair">
                <label htmlFor="password">Enter Password :</label>
                <div className="password-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <button type="submit" className="signup-button">
                {loading ? "Logging In..." : "Login"}
              </button>
              <div>
                <p>
                  New Here?{" "}
                  <Link className="new-here-btn" to="/captainSignup">
                    Register as a Captain
                  </Link>
                </p>
                <p className="forgot-password-user">
                  Forgot Password?{" "}
                  <Link className="forgot-password-btn" to="/forgot-password">
                    Reset Password
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <Link className="signin-btn-captain" to="/login">
          Sign in as User
        </Link>
      </div>
    </>
  );
};

export default CaptainLogin;
