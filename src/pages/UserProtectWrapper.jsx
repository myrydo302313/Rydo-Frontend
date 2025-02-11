import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";


const UserProtectWrapper = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Get auth status from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]); // Depend on isLoggedIn, not localStorage

  return <>{children}</>;
};

export default UserProtectWrapper;
