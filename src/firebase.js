// Import the Firebase functions you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDThI2apXiWXj-xLvRwgxHsPX88D2UBWnM",
  authDomain: "rydo-636aa.firebaseapp.com",
  projectId: "rydo-636aa",
  storageBucket: "rydo-636aa.firebasestorage.app",
  messagingSenderId: "843567514235",
  appId: "1:843567514235:web:9a9aa5835d846699d818de",
  measurementId: "G-KYZXG2822E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Request Notification Permission
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BHqlCp3o_qEs99RjTzss5Lw_pg0V8ueDszdqtkA-FLRmXuZbY9QHh1NJIdxUukd9G3v_RlpPLpuuUxaHBsCpjyI",
      });
      console.log("FCM Token:", token);
      // Send this token to your backend for sending push notifications
      return token;
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting permission:", error);
  }
};

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});

export { messaging };
