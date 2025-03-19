import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectIfLoggedIn = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Outlet />;
};

export default RedirectIfLoggedIn;
