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
          <Route path="/captainSignup" element={<CaptainSignup />} />
          <Route path="/captain-riding" element={<CaptainRiding />} />
          <Route path="/userAccount" element={<UserAccount />} />
          <Route path="/services" element={<RydoServices />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
