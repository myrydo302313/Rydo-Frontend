importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDThI2apXiWXj-xLvRwgxHsPX88D2UBWnM",
  authDomain: "rydo-636aa.firebaseapp.com",
  projectId: "rydo-636aa",
  storageBucket: "rydo-636aa.appspot.com",
  messagingSenderId: "843567514235",
  appId: "1:843567514235:web:9a9aa5835d846699d818de",
  measurementId: "G-KYZXG2822E",
});

// Retrieve messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("✅ Background message received:", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message.",
    icon: "/images/rydoLogo3.png",
    badge: "/images/rydoLogo3.png",
    vibrate: [200, 100, 200],
  };

  // Show notification in the background
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("✅ Notification clicked:", event.notification);
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        clientList[0].focus();
      } else {
        clients.openWindow("/"); // Redirect to homepage or app
      }
    })
  );
});
