import React, { useState, useContext } from "react";
// import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../styles/Login.css";
import { useAuth } from "../store/auth";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { storeUserToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false)
        toast.error(errorData.message || "Registration failed!");
        return;
      }

      const data = await response.json();
      console.log("Response Data:", data);

      setLoading(false);
      storeUserToken(data.token);

      setFormData({ email: "", password: "" });
      navigate("/home");
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
          <img src="/images/rydoLogo3.png" alt="" width={80} />
          <h2>Rydo</h2>
        </div>
        <div className="login-hero">
          <div>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-pair">
                <label htmlFor="email">What's your email : </label>
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
              <div lassName="login-form-pair">
                <label htmlFor="password">Enter Password :</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {/* <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                >
                  {passwordVisible ? "Hide Password" : "Show Password"}
                </button> */}
              </div>
              <button type="submit" className="signup-button">
                {loading ? "Logging In..." : "Login"}
              </button>
              <div>
                <p>
                  New Here?{" "}
                  <Link className="new-here-btn" to="/signup">
                    Create New account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <Link className="signin-btn-captain" to="/captainLogin">
          Sign in as Captain
        </Link>
      </div>
    </>
  );
};

export default Login;
