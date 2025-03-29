import React from "react";
import { SocialIcon } from "react-social-icons";
import "../styles/SocialLinks.css";

const SocialLinks = () => {
  return (
    <div className="social">
      {/* Open WhatsApp directly */}
      <SocialIcon
        network="whatsapp"
        url="whatsapp://send?phone=7261007718"
        onClick={(e) => {
          e.preventDefault(); // Prevent default browser behavior
          window.location.href = "whatsapp://send?phone=7261007718";
        }}
      />

      {/* Other social links */}
      <p>
        <SocialIcon url="https://x.com/Rydo552080" />
      </p>
      <p>
        <SocialIcon url="https://www.instagram.com/rydo302313" />
      </p>
    </div>
  );
};

export default SocialLinks;
