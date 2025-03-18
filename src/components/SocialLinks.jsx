import React from "react";
import { SocialIcon } from "react-social-icons";
import "../styles/SocialLinks.css";

const SocialLinks = () => {
  return (
    <>
      <div className="social">
        <SocialIcon
          network="whatsapp"
          url="https://api.whatsapp.com/send?phone=7261007718"
        />

        <p>
          <SocialIcon url="https://x.com/Rydo552080" />
        </p>
        {/* <p><SocialIcon url="https://www.linkedin.com/" /></p> */}
        <p>
          <SocialIcon url="https://www.instagram.com/rydo302313" />
        </p>
      </div>
    </>
  );
};

export default SocialLinks;
