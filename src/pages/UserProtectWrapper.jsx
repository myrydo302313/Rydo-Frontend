import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";


const UserProtectWrapper = ({ children }) => {
  const { isUserLoggedIn , isCaptainLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn && !isCaptainLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn,isCaptainLoggedIn, navigate]); 

  return <>{children}</>;
};

export default UserProtectWrapper;
