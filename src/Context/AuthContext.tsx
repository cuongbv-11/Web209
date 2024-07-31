import React, { createContext, useContext } from "react";
import { User } from "../interfaces/User";
import { instance } from "../api/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  login: (data: User) => Promise<void>;
  register: (data: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const nav = useNavigate();

  const login = async (data: User) => {
    try {
      const res = await instance.post("/login", data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("accessToken", res.data.accessToken);
      nav("/");
    } catch (error: any) {
      alert(error.response?.data || "Error!");
    }
  };

  const register = async (data: User) => {
    try {
      await instance.post("/register", {
        email: data.email,
        password: data.password,
      });
      nav("/login");
    } catch (error: any) {
      alert(error.response?.data || "Error!");
    }
  };

  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
