import React, { useState } from "react";
import "../styles/Feedback.css";
import SocialLinks from "../components/SocialLinks";
import BottomNav from "../components/BottomNav";
import CaptainNav from "../components/CaptainNav";

const CaptainFeedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // API call can be integrated here

    // Reset form after submission
    setTimeout(() => {
      setSubmitted(false);
      setFeedbackData({
        name: "",
        email: "",
        feedback: "",
      });
    }, 3000);
  };

  return (
    <>
      <div className="feedback-page">
        <div className="feedback-container">
          <div className="feedback-content">
            <h1 className="feedback-title">Share Your Thoughts! ✨</h1>
            <p className="feedback-subtitle">
              Your feedback helps us improve. Let us know what you think!
            </p>

            {submitted ? (
              <div className="feedback-success-message">
                🎉 Thank you for your feedback! We appreciate your time. 🎊
              </div>
            ) : (
              <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="feedback-form-group">
                  <label className="feedback-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="feedback-input"
                    value={feedbackData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="feedback-form-group">
                  <label className="feedback-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="feedback-input"
                    value={feedbackData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="feedback-form-group">
                  <label className="feedback-label">Your Feedback</label>
                  <textarea
                    name="feedback"
                    className="feedback-textarea"
                    rows="4"
                    value={feedbackData.feedback}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="feedback-submit-button">
                  🚀 Send Feedback
                </button>
              </form>
            )}

            <div className="feedback-contact-details">
              <h2 className="feedback-contact-title">📞 Contact Us</h2>
              <p className="feedback-contact-info">
                <strong>Email:</strong>{" "}
                <a href="mailto:myrydo@gmail.com">myrydo@gmail.com</a>
              </p>
              <p className="feedback-contact-info">
                <strong>Phone:</strong> +91 7261007718
              </p>
            </div>
          </div>
        </div>
        <CaptainNav/>
      </div>
    </>
  );
};

export default CaptainFeedback;
