import { useEffect } from "react";
import { requestNotificationPermission } from "./firebase";

export default function NotificationProvider({ children }) {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return children;
}
