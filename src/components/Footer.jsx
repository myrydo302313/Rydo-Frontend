import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-use">Terms Of Use</Link>
        <Link to="/contact-us">Contact Us</Link>


      </div>
      <p className="footer-text">© 2025 Rydo. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
