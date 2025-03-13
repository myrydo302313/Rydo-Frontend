import React from "react";
import "../styles/CancellationRefund.css";

const CancellationRefund = () => {
  return (
    <div className="cancellation-container">
      <div className="cancellation-content">
        <h1 className="cancellation-title">Cancellation & Refund Policy</h1>
        <p className="cancellation-intro">
          At <strong>MyRydo</strong>, we strive to provide a seamless and efficient service to all our users. 
          However, we understand that sometimes plans change. Below are the details of our cancellation 
          and refund policies.
        </p>

        <div className="policy-section">
          <h2 className="policy-heading">1. Cancellation Policy</h2>
          <p className="policy-text">
            You may cancel a ride at any time before the driver arrives at your location. 
            However, cancellation charges may apply depending on the time of cancellation.
          </p>
          <ul className="policy-list">
            <li>
              If you cancel within <strong>5 minutes</strong> of booking, no cancellation fee will be charged.
            </li>
            <li>
              If you cancel after the driver has been assigned, a minimal cancellation fee will be applicable.
            </li>
            <li>
              Repeated cancellations may lead to temporary suspension of your account.
            </li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="policy-heading">2. Refund Policy</h2>
          <p className="policy-description">
            Refunds are processed under the following conditions:
          </p>
          <ul className="policy-list">
            <li>If you cancel a ride before the driver is assigned, a full refund will be issued.</li>
            <li>If the driver cancels the ride, a full refund will be processed.</li>
            <li>
              If a ride is canceled after the driver has arrived, cancellation charges may apply, and the 
              refund amount will be adjusted accordingly.
            </li>
            <li>Refunds will be credited to your original payment method within 5-7 business days.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="policy-heading">3. Late Arrival Policy</h2>
          <p className="policy-text">
            If the driver arrives at your location and you do not show up within 5 minutes, 
            the ride will be canceled, and a cancellation fee may be applied.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="policy-heading">4. Non-Refundable Cases</h2>
          <ul className="policy-list">
            <li>No refund for completed rides.</li>
            <li>No refund if you fail to board after booking confirmation.</li>
            <li>No refund if cancellation is made after the driver has reached your pickup location.</li>
          </ul>
        </div>

        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>If you have any questions regarding our cancellation & refund policy, please contact us at:</p>
          <p><strong>Email:</strong> <a href="mailto:support@myrydo.com">support@myrydo.com</a></p>
          <p><strong>Phone:</strong> +91 7261007718</p>
          <p><strong>Address:</strong> Shivdayal Nagar, Hazaribagh, Jharkhand - 825301</p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;
