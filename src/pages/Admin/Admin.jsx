import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import AdminNavbar from "./AdminNavbar";
import AdminHome from "../../components/Admin/AdminHome";

const Admin = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate=useNavigate();

  {console.log('ye rha be',user)}

  {user?.userData.role!='admin' && navigate('/home')}

  const isHome = location.pathname === "/admin";

  // Apply gradient background only on admin pages
  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    document.body.style.backgroundAttachment = "fixed"; // Keep the gradient fixed
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100vh";

    return () => {
      document.body.style.background = ""; // Reset when leaving admin page
    };
  }, []);

  return (
    <>
      <AdminNavbar />
      {isHome ? <AdminHome /> : <Outlet />}
    </>
  );
};

export default Admin;
