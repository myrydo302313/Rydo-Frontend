import React from "react";
import SocialLinks from "../components/SocialLinks";
import BottomNav from "../components/BottomNav";
import "../styles/Help.css";

const Help = () => {
  return (
    <>
      <div className="help-page">
        <img src="/images/help.png" alt="" />
        <h2 className="help-page-title" align="center">For Any Help, You can directly contact us : </h2>

        <SocialLinks />

        <div className="contact-details-help">
          <h2>Our Office</h2>
          <p>
            <strong>Address:</strong>Shivdayal Nagar, Hazaribagh-825301
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:myrydo@gmail.com">myrydo@gmail.com</a>
          </p>
          <p>
            <strong>Phone:</strong> +91 7261007718
          </p>
        </div>
        <BottomNav />
      </div>
    </>
  );
};

export default Help;
