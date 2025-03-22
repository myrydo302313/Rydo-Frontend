import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

import MainHome from "./pages/MainHome";
import Login from "./pages/Login";
import CaptainLogin from "./pages/CaptainLogin";
import Signup from "./pages/Signup";
import CaptainSignup from "./pages/CaptainSignup";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import Home from "./pages/Home";
import UserAccount from "./pages/UserAccount";
import Riding from "./pages/Riding";
import UserRideFinal from "./pages/UserRideFinal";
import WaitingForDriver from "./pages/WaitingForDriver";
import CaptainHome from "./pages/CaptainHome";
import CaptainAccount from "./pages/CaptainAccount";
import CaptainRides from "./pages/CaptainRides";
import CaptainRideFinal from "./pages/CaptainRideFinal";
import CaptainRiding from "./pages/CaptainRiding";
import ConfirmRidePopUp from "./pages/ConfirmRidePopUp";
import Admin from "./pages/Admin/Admin";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminCaptains from "./pages/Admin/AdminCaptains";
import AdminRides from "./pages/Admin/AdminRides";
import RydoServices from "./pages/RydoServices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ContactUs from "./pages/ContactUs";
import CancellationRefund from "./pages/CancellationRefund";
import ShippingDelivery from "./pages/ShippingDelivery";
import AboutUs from "./pages/AboutUs";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Feedback from "./pages/Feedback";
import { useEffect } from "react";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const firebaseConfig = {
  apiKey: "AIzaSyDThI2apXiWXj-xLvRwgxHsPX88D2UBWnM",
  authDomain: "rydo-636aa.firebaseapp.com",
  projectId: "rydo-636aa",
  storageBucket: "rydo-636aa.appspot.com",
  messagingSenderId: "843567514235",
  appId: "1:843567514235:web:9a9aa5835d846699d818de",
  measurementId: "G-KYZXG2822E",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

function App() {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          console.log("✅ Service Worker Registered:", registration);

          // Ensure FCM Token is retrieved only after SW is registered
          requestNotificationPermission();
        } catch (error) {
          console.error("❌ Service Worker Registration Failed:", error);
        }
      }
    };

    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: "BHqlCp3o_qEs99RjTzss5Lw_pg0V8ueDszdqtkA-FLRmXuZbY9QHh1NJIdxUukd9G3v_RlpPLpuuUxaHBsCpjyI",
          });
          console.log("🔥 FCM Token:", token);
        } else {
          console.warn("🚫 Notification Permission Denied.");
        }
      } catch (error) {
        console.error("❌ Error Getting FCM Token:", error);
      }
    };

    const setupForegroundListener = () => {
      onMessage(messaging, (payload) => {
        console.log("📩 Foreground Notification Received:", payload);
        alert(payload.notification?.title || "New Notification");
      });
    };

    registerServiceWorker();
    requestNotificationPermission();
    setupForegroundListener();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/captainLogin" element={<CaptainLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/captainSignup" element={<CaptainSignup />} />
          <Route path="/services" element={<RydoServices />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/cancel-refund" element={<CancellationRefund />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* User Protected Routes */}
          <Route
            path="/home"
            element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/userAccount"
            element={
              <UserProtectWrapper>
                <UserAccount />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/riding"
            element={
              <UserProtectWrapper>
                <Riding />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/user-ride-final"
            element={
              <UserProtectWrapper>
                <UserRideFinal />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/waiting-for-driver"
            element={
              <UserProtectWrapper>
                <WaitingForDriver />
              </UserProtectWrapper>
            }
          />

          {/* Captain Protected Routes */}
          <Route
            path="/captainHome"
            element={
              <CaptainProtectWrapper>
                <CaptainHome />
              </CaptainProtectWrapper>
            }
          />
          <Route
            path="/captain-account"
            element={
              <CaptainProtectWrapper>
                <CaptainAccount />
              </CaptainProtectWrapper>
            }
          />
          <Route
            path="/captain-rides"
            element={
              <CaptainProtectWrapper>
                <CaptainRides />
              </CaptainProtectWrapper>
            }
          />
          <Route
            path="/captain-riding"
            element={
              <CaptainProtectWrapper>
                <CaptainRiding />
              </CaptainProtectWrapper>
            }
          />
          <Route
            path="/captain-ride-final"
            element={
              <CaptainProtectWrapper>
                <CaptainRideFinal />
              </CaptainProtectWrapper>
            }
          />
          <Route
            path="/captain-ride-pop-up"
            element={
              <CaptainProtectWrapper>
                <ConfirmRidePopUp />
              </CaptainProtectWrapper>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="captains" element={<AdminCaptains />} />
            <Route path="rides" element={<AdminRides />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
