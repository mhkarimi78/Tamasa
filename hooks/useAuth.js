import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import * as Google from "expo-google-app-auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{
        user:
          token != null && token != "undefined"
            ? {
                name: "mahsa",
                photoURL:
                  "https://img01.ztat.net/article/spp-media-p1/52b02f740d0143d6b882c221dae797b8/b9a178307a2f4d4aa7038483c5cb27b1.jpg?imwidth=1800&filter=packshot",
              }
            : 
            null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
