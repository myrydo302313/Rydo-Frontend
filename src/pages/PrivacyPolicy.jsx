import React from "react";
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1 className="privacy-policy-title">Privacy Policy</h1>
        <p className="privacy-policy-update"><strong>Last Updated:</strong> March 2025</p>

        <p className="privacy-policy-intro">
          Welcome to <strong>Rydo</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website, mobile application, and services.
        </p>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-heading">1. Information We Collect</h2>
          <ul className="privacy-policy-list">
            <li><strong>Personal Information:</strong> Name, email, phone number, profile picture, and payment details.</li>
            <li><strong>Location Data:</strong> We may collect your precise or approximate location when you use our services.</li>
            <li><strong>Usage Information:</strong> Device information, IP address, browser type, and app usage details.</li>
            <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to improve your experience.</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-heading">2. How We Use Your Information</h2>
          <ul className="privacy-policy-list">
            <li>Provide, improve, and personalize our services.</li>
            <li>Process transactions and manage payments.</li>
            <li>Send updates, security alerts, and promotional offers.</li>
            <li>Ensure safety and security of our platform.</li>
            <li>Comply with legal obligations and resolve disputes.</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-heading">3. How We Share Your Information</h2>
          <ul className="privacy-policy-list">
            <li><strong>Service Providers:</strong> Third-party vendors that help us run our business (e.g., payment processors, customer support).</li>
            <li><strong>Law Enforcement:</strong> When required by law or to protect our users and company.</li>
            <li><strong>Business Transfers:</strong> If we undergo a merger, acquisition, or sale of assets.</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-heading">4. Data Retention & Security</h2>
          <p className="privacy-policy-text">We retain your data as long as necessary for business and legal purposes. Your data is secured using encryption and strict access controls.</p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-heading">5. Your Rights</h2>
          <ul className="privacy-policy-list">
            <li>Access and request a copy of your data.</li>
            <li>Correct inaccurate or incomplete information.</li>
            <li>Request deletion of your data.</li>
            <li>Opt-out of marketing communications.</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-heading">6. Contact Us</h2>
          <p className="privacy-policy-text">
            If you have any questions about this policy, please contact us at:
          </p>
          <p className="privacy-policy-contact">
            <strong>Email:</strong> <a href="mailto:myrydo@gmail.com">myrydo@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
