import React, { useState } from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Here, you can integrate an API call to send the form data to your backend

    // Clear the form after submission
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Have any questions? We’d love to hear from you! Get in touch with us.
        </p>

        {submitted ? (
          <div className="success-message">Thank you! We will get back to you soon.</div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        )}

        <div className="contact-details">
          <h2>Our Office</h2>
          <p><strong>Address:</strong>Shivdayal Nagar, Hazaribagh-825301</p>
          <p><strong>Email:</strong> <a href="mailto:myrydo@gmail.com">myrydo@gmail.com</a></p>
          <p><strong>Phone:</strong> +91 7261007718</p>
        </div>

        {/* <div className="contact-map">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.547924264199!2d85.80626731428953!3d20.296059086392733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d1e5422f05%3A0xd1c4b24a354e5d2a!2sKIIT%20University!5e0!3m2!1sen!2sin!4v1710207100141!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default ContactUs;
