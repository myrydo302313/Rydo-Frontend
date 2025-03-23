import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import AdminNavbar from "./AdminNavbar";
import AdminHome from "../../components/Admin/AdminHome";

const Admin = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if user is not admin
  useEffect(() => {
    if (user && user.userData?.role !== "admin") {
      navigate("/home");
    }
  }, [user, navigate]);

  // Apply gradient background only on admin pages
  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100vh";

    return () => {
      document.body.style.background = "";
    };
  }, []);

  // Show a loading state while user data is being fetched
  if (!user) {
    return <div>Loading...</div>;
  }

  // If user is not admin, redirect (backup check in case useEffect is delayed)
  if (user.userData?.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  const isHome = location.pathname === "/admin";

  return (
    <>
      <AdminNavbar />
      {isHome ? <AdminHome /> : <Outlet />}
    </>
  );
};

export default Admin;
