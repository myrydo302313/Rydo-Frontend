import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://rydo-backend.onrender.com";
export const SocketContext = createContext();

const socket = io(`${baseURL}`); 

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
