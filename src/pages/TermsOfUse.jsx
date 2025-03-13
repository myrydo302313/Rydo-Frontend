import React from "react";
import "../styles/TermsOfUse.css";

const TermsOfUse = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1 className="terms-title">Terms of Use</h1>
        <p className="terms-update"><strong>Last Updated:</strong> March 2025</p>

        <p className="terms-intro">
          Welcome to <strong>Rydo</strong>. By accessing or using our website, mobile application, and services (collectively, the "Services"), you agree to comply with and be bound by these **Terms of Use**. Please read them carefully.
        </p>

        <section className="terms-section">
          <h2 className="terms-heading">1. Acceptance of Terms</h2>
          <p className="terms-text">
            By accessing or using our Services, you acknowledge that you have read, understood, and agreed to these Terms. If you do not agree, you may not use our Services.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">2. User Eligibility</h2>
          <p className="terms-text">
            You must be at least 18 years old to use our Services. If you are using our Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">3. User Responsibilities</h2>
          <ul className="terms-list">
            <li>You agree to provide accurate and up-to-date information.</li>
            <li>You will not misuse our Services for any unlawful or prohibited activities.</li>
            <li>Unauthorized access to our systems is strictly prohibited.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">4. Service Usage</h2>
          <p className="terms-text">
            Our Services may be updated, modified, or discontinued at any time. We reserve the right to limit access, modify, or discontinue any part of our Services at our sole discretion.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">5. Payment & Refunds</h2>
          <ul className="terms-list">
            <li>All payments for our services are non-refundable.</li>
            <li>Users must provide valid payment details for transactions.</li>
            <li>In case of a failed payment, services may be temporarily restricted.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">6. Limitation of Liability</h2>
          <p className="terms-text">
            We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our Services. Use our platform at your own risk.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">7. Termination</h2>
          <p className="terms-text">
            We reserve the right to terminate or suspend your access to our Services at any time, without prior notice, if we believe you have violated these Terms or engaged in unauthorized activities.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">8. Changes to These Terms</h2>
          <p className="terms-text">
            We may update these Terms from time to time. Your continued use of our Services after any modifications constitutes your acceptance of the updated Terms.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">9. Contact Us</h2>
          <p className="terms-text">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="terms-contact">
            <strong>Email:</strong> <a href="mailto:myrydo@gmail.com">myrydo@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
