import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-use">Terms Of Use</Link>

        {/* <a href="/refund-policy">Refund Policy</a>
        <a href="/disclaimer">Disclaimer</a> */ }
      </div>
      <p className="footer-text">© 2025 Rydo. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
