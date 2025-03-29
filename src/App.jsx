import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

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
import Help from "./pages/Help";
import CaptainFeedback from "./pages/CaptainFeedback";
import CaptainContactUs from "./pages/CaptainContactUs";
import CaptainHelp from "./pages/CaptainHelp";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

function App() {

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
          <Route path="/captain-contact-us" element={<CaptainContactUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/captain-feedback" element={<CaptainFeedback />} />
          <Route path="/cancel-refund" element={<CancellationRefund />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/captain-help" element={<CaptainHelp />} />
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
