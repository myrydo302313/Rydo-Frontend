import React from "react";
import { SocialIcon } from "react-social-icons";
import "../styles/SocialLinks.css";

const SocialLinks = () => {
  return (
    <div className="social">
      {/* Open WhatsApp directly */}
      <a href="whatsapp://send?phone=7261007718">
        <SocialIcon network="whatsapp" />
      </a>

      {/* Other social links */}
      <p>
        <a
          href="https://x.com/Rydo552080"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon url="https://x.com/Rydo552080" />
        </a>
      </p>
      <p>
        <a
          href="https://www.instagram.com/rydo302313"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon url="https://www.instagram.com/rydo302313" />
        </a>
      </p>
    </div>
  );
};

export default SocialLinks;
