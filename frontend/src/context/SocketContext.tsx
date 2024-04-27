/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";

// Define a default value for the context
const defaultContextValue = {
  socket: null,
  onlineUsers: [],
};

// Create the context with the default value
const SocketContext = createContext<{
  socket: Socket | null;
  onlineUsers: string[];
}>(defaultContextValue);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

interface SocketContextProviderProps {
  children: React.ReactNode;
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext() || {};

  useEffect(() => {
    if (authUser) {
      const socket: Socket = io("http://localhost:3000/", {
        query: { userId: authUser._id },
      });
      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [socket, authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};