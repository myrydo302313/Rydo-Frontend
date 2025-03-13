import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About <span className="highlight">MyRydo</span></h1>
        <p className="about-intro">
          Welcome to <strong>MyRydo</strong>, your reliable and affordable ride-hailing partner. 
          We are committed to providing safe, comfortable, and affordable transportation services 
          across various cities in India. Our mission is to revolutionize urban mobility with 
          seamless, eco-friendly, and technology-driven solutions.
        </p>

        <div className="about-section">
          <h2 className="about-heading">🚗 Our Mission</h2>
          <p className="about-text">
            At <strong>MyRydo</strong>, we aim to redefine urban commuting by offering **convenient, 
            affordable, and secure** ride-hailing solutions. We strive to connect riders with professional 
            drivers, ensuring a hassle-free and safe travel experience.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-heading">🌎 Why Choose Us?</h2>
          <ul className="about-list">
            <li>🚖 **Safe and Reliable Rides** – All our drivers undergo strict background verification.</li>
            <li>💰 **Affordable Pricing** – Competitive pricing with no hidden charges.</li>
            <li>📱 **Seamless Booking** – Easy-to-use app for quick ride bookings.</li>
            <li>⏳ **24/7 Availability** – We operate round the clock for your convenience.</li>
            <li>💳 **Multiple Payment Modes** – Pay via UPI, Cards, Wallets, or Cash.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2 className="about-heading">🌏 Our Reach</h2>
          <p className="about-text">
            MyRydo operates in multiple cities, constantly expanding to serve more customers with 
            seamless and cost-effective travel solutions.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-heading">📞 Contact Us</h2>
          <p className="about-text">
            Have any queries or feedback? Reach out to us:
          </p>
          <p><strong>Email:</strong> <a href="mailto:myrydo@gmail.com">myrydo@gmail.com</a></p>
          <p><strong>Phone:</strong> +91 7261007718</p>
          <p><strong>Address:</strong> Shivdayal Nagar, Hazaribagh, Jharkhand - 825301</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
