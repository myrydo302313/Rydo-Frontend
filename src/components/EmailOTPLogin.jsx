import React, { useState } from "react";
import { auth, sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink } from "../firebase";

const EmailOTPLogin = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    if (!email) return alert("Enter a valid email");

    const actionCodeSettings = {
      url: window.location.href,  // Redirect after OTP verification
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("OTP link sent to your email! Check your inbox.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = window.localStorage.getItem("emailForSignIn");

      if (!storedEmail) {
        storedEmail = prompt("Please enter your email for confirmation");
      }

      try {
        await signInWithEmailLink(auth, storedEmail, window.location.href);
        setMessage("OTP verified! You are logged in.");
        window.localStorage.removeItem("emailForSignIn");
      } catch (error) {
        console.error(error);
        setMessage("Invalid OTP link. Try again.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login with Email OTP</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      <p>{message}</p>
      {isSignInWithEmailLink(auth, window.location.href) && (
        <button onClick={verifyOtp}>Verify OTP</button>
      )}
    </div>
  );
};

export default EmailOTPLogin;