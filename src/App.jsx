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

          {/* Captain Path */}
          <Route path="/captain-rides" element={<CaptainRides />} />
          <Route path="/captain-account" element={<CaptainAccount />} />
          <Route path="/captain-ride-final" element={<CaptainRideFinal />} />

          {/* Admin Path */}
          <Route path="/admin" element={<Admin />}>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
