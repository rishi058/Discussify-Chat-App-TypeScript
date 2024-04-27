import { createContext, useContext, useState } from "react";
import UserModel from "../interfaces/UserModel";

interface AuthContextType {
  authUser: UserModel | null;
  setAuthUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<UserModel | null>(
    JSON.parse(localStorage.getItem("chat-user") || "null")
  );

  const value: AuthContextType = {
    authUser,
    setAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};