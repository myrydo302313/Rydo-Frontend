import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const CaptainProtectWrapper = ({ children }) => {
  const { isCaptainLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCaptainLoggedIn) {
      navigate("/login");
    }
  }, [isCaptainLoggedIn, navigate]);

  return <>{children}</>;
};

export default CaptainProtectWrapper;
