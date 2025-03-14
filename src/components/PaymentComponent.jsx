import React, { useState } from "react";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

const PaymentComponent = ({ amt }) => {
  const { captain, captainAuthToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY; 

  const headers = {
    "Content-Type": "application/json",
    Authorization: captainAuthToken,
  };

  // ✅ Function to load Razorpay SDK dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    setLoading(true);

    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) {
      alert("Failed to load Razorpay. Check your internet connection.");
      setLoading(false);
      return;
    }

    try {
      // Create Order with Authorization Header
      const response = await fetch(`${baseURL}/api/payments/create-order`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ amount: amt }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const options = {
        key: RAZORPAY_KEY, // ✅ Use correct env variable
        amount: data.amount,
        currency: "INR",
        name: "MyRydo",
        description: "Ride Payment",
        order_id: data.id,
        handler: async function (response) {
          
          const verifyResponse = await fetch(
            `${baseURL}/api/payments/verify-payment`,
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert(
              `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
            );
          } else {
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: captain?.captainData.name,
          email: captain?.captainData.email,
          contact: captain?.captainData.phone,
          vpa: "" ,
        },
        theme: { color: "#007bff" },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <button onClick={initiatePayment} disabled={loading} className="pay-commission-button">
      {/* {console.log("Captain le:", captain.captainData)} */}
      {loading ? "Processing..." : `Pay ₹${amt}`}
    </button>
  );
};

export default PaymentComponent;
