import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Ride from "./pages/Ride";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ride" element={<Ride />} />
              <Route path="/pickUp" element={<Home />} />
              <Route path="/drivers" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
      </div>
    </>
  );
}

export default App;
