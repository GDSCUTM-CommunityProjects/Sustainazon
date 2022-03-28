import React, { useEffect, useState } from "react";
import { instance } from "../axios";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      await instance.get("/accounts/manage").then(() => {
        setIsLoggedIn(true);
        console.log("Setting LoggedIn");
      });
    };
    fetchUserData();
  }, []);
  return isLoggedIn;
};

export const ProtectedRoute = () => {
  const isLoggedIn = useAuth();
  console.log(isLoggedIn);
  if (isLoggedIn === null) {
    return null;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
};
