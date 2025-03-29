import React from "react";
import { SocialIcon } from "react-social-icons";
import "../styles/SocialLinks.css";

const SocialLinks = () => {
  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="social">
      {/* Open WhatsApp directly */}
      <SocialIcon
        network="whatsapp"
        url="whatsapp://send?phone=7261007718"
        onClick={(url) => {
          handleLinkClick(url);
        }}
      />

      {/* Other social links */}
      <p>
        <SocialIcon
          url="https://x.com/Rydo552080"
          onClick={(url) => {
            handleLinkClick(url);
          }}
        />
      </p>
      <p>
        <SocialIcon
          url="https://www.instagram.com/rydo302313"
          onClick={(url) => {
            handleLinkClick(url);
          }}
        />
      </p>
    </div>
  );
};

export default SocialLinks;
