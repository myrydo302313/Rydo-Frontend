import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 🔥 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDThI2apXiWXj-xLvRwgxHsPX88D2UBWnM",
  authDomain: "rydo-636aa.firebaseapp.com",
  projectId: "rydo-636aa",
  storageBucket: "rydo-636aa.appspot.com",
  messagingSenderId: "843567514235",
  appId: "1:843567514235:web:9a9aa5835d846699d818de",
  measurementId: "G-KYZXG2822E",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ✅ Request Notification Permission
export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("✅ Notification permission granted.");
    await getFCMToken();
  } else {
    console.log("❌ Notification permission denied.");
  }
}

// ✅ Get Firebase Cloud Messaging Token
export async function getFCMToken() {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BHqlCp3o_qEs99RjTzss5Lw_pg0V8ueDszdqtkA-FLRmXuZbY9QHh1NJIdxUukd9G3v_RlpPLpuuUxaHBsCpjyI",
    });

    if (token) {
      console.log("📢 FCM Token:", token);
    } else {
      console.log("⚠️ No registration token available.");
    }
  } catch (error) {
    console.error("🚨 Error getting FCM token:", error);
  }
}

// ✅ Listen for Foreground Messages
onMessage(messaging, (payload) => {
  console.log("📩 Foreground Message Received:", payload);
  alert(`📢 ${payload.notification.title}: ${payload.notification.body}`);
});

// ✅ Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ Service Worker registered successfully:", registration);
    })
    .catch((error) => {
      console.error("🚨 Service Worker registration failed:", error);
    });
}
