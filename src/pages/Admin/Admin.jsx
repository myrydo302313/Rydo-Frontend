import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";

const Admin = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === "/admin";

  if (!user?.userData?.role == "admin") {
    return <Navigate to="/" />;
  }

  return (
    <>
    This is admin
    <AdminNavbar/>
    {/* {isHome ? <VendorHome /> : <Outlet />} */}
      {/* <Link to="/" className="back-to-home-btn">
        <FaArrowAltCircleLeft /> Back To Home Page
      </Link> */}
      {/* <VendorNavbar /> */}
      {/* {isHome ? <VendorHome /> : <Outlet />} */}
    </>
  );
};

export default Admin;
