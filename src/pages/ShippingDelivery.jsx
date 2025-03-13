import React from "react";
import "../styles/ShippingDelivery.css";

const ShippingDelivery = () => {
  return (
    <div className="shipping-container">
      <div className="shipping-content">
        <h1 className="shipping-title">Shipping & Delivery Policy</h1>
        <p className="shipping-intro">
          At <strong>MyRydo</strong>, we strive to ensure a seamless and timely service for all our users. 
          Below, you will find details regarding our shipping and delivery policies.
        </p>

        <div className="policy-section">
          <h2 className="policy-heading">1. Service Availability</h2>
          <p className="policy-text">
            Our ride-hailing services are available in selected cities across India. 
            The availability of rides may vary based on demand, location, and time of day.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="policy-heading">2. Ride Confirmation & Dispatch</h2>
          <ul className="policy-list">
            <li>Once you book a ride, our system will match you with the nearest available driver.</li>
            <li>You will receive a confirmation notification with driver details, estimated arrival time, and ride fare.</li>
            <li>In rare cases of high demand, there may be slight delays in ride availability.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="policy-heading">3. Estimated Arrival Time</h2>
          <p className="policy-text">
            The estimated time of arrival (ETA) is an approximation and may vary due to factors such as traffic, 
            weather conditions, and unforeseen circumstances.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="policy-heading">4. Delayed or Canceled Rides</h2>
          <ul className="policy-list">
            <li>In case of an unexpected delay, our driver will inform you at the earliest.</li>
            <li>
              If your ride is canceled due to unforeseen circumstances, a full refund will be provided if applicable.
            </li>
            <li>Users may be charged a cancellation fee if they cancel their ride after the driver has arrived.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="policy-heading">5. Responsibilities of the User</h2>
          <ul className="policy-list">
            <li>Ensure accurate pickup and drop-off locations.</li>
            <li>Be available at the pickup point within 5 minutes of driver arrival.</li>
            <li>Follow all safety protocols and guidelines during the ride.</li>
          </ul>
        </div>

        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>If you have any questions regarding our Shipping & Delivery policy, feel free to contact us:</p>
          <p><strong>Email:</strong> <a href="mailto:support@myrydo.com">support@myrydo.com</a></p>
          <p><strong>Phone:</strong> +91 7261007718</p>
          <p><strong>Address:</strong> Shivdayal Nagar, Hazaribagh, Jharkhand - 825301</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery;
