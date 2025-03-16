import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/auth.jsx";
import SocketProvider from "./context/SocketContext.jsx";
import { requestNotificationPermission } from "./firebase.js";

// ✅ Request Notification Permission on Page Load
document.addEventListener("DOMContentLoaded", () => {
  requestNotificationPermission();
});

createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </SocketProvider>
);
