import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.vercel.app";
export const SocketContext = createContext();

const socket = io(`${baseURL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Basic connection logic
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
