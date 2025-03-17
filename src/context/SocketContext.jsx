import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const storedSocketId = localStorage.getItem("socket_id"); // 🔹 Get saved socket ID

    const newSocket = io(baseURL, {
      transports: ["websocket","polling"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      auth: {
        socket_id: storedSocketId, // 🔹 Use saved socket ID if available
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to server:", newSocket.id);
      setIsConnected(true);
      localStorage.setItem("socket_id", newSocket.id); // 🔹 Save socket ID
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
      setIsConnected(false);
    });

    return () => {
      newSocket.off("connect");
      newSocket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;