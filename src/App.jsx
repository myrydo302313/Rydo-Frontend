import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MainHome from "./pages/MainHome";
import Login from "./pages/Login";
import CaptainLogin from "./pages/CaptainLogin";
import Signup from "./pages/Signup";
import CaptainSignup from "./pages/CaptainSignup";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainHome from "./pages/CaptainHome";
import UserAccount from "./pages/UserAccount";
import CaptainRiding from "./pages/CaptainRiding";
import RydoServices from "./pages/RydoServices";
import Riding from "./pages/Riding";
import CaptainRides from "./pages/CaptainRides";
import CaptainAccount from "./pages/CaptainAccount";
import Admin from "./pages/Admin/Admin";
import CaptainRideFinal from "./pages/CaptainRideFinal";
import UserRideFinal from "./pages/UserRideFinal";
import WaitingForDriver from "./pages/WaitingForDriver";
import ConfirmRidePopUp from "./pages/ConfirmRidePopUp";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ContactUs from "./pages/ContactUs";
import CancellationRefund from "./pages/CancellationRefund";
import ShippingDelivery from "./pages/ShippingDelivery";
import AboutUs from "./pages/AboutUs";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminCaptains from "./pages/Admin/AdminCaptains";
import AdminRides from "./pages/Admin/AdminRides";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route
            path="/home"
            element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/captainHome"
            element={
              <UserProtectWrapper>
                <CaptainHome />
              </UserProtectWrapper>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/captainLogin" element={<CaptainLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/riding" element={<Riding />} />

          <Route path="/captainSignup" element={<CaptainSignup />} />
          <Route path="/captain-riding" element={<CaptainRiding />} />
          <Route path="/userAccount" element={<UserAccount />} />
          <Route path="/services" element={<RydoServices />} />

          <Route path="/waiting-for-driver" element={<WaitingForDriver />} />
          <Route path="/user-ride-final" element={<UserRideFinal />} />

          {/* Captain Path */}
          <Route path="/captain-rides" element={<CaptainRides />} />
          <Route path="/captain-account" element={<CaptainAccount />} />
          <Route path="/captain-ride-final" element={<CaptainRideFinal />} />
          <Route path="/captain-ride-pop-up" element={<ConfirmRidePopUp />} />

          {/* Admin Path */}
          <Route path="/admin" element={<Admin />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="captains" element={<AdminCaptains />} />
            <Route path="rides" element={<AdminRides />} />
          </Route>

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cancel-refund" element={<CancellationRefund />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
