import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { isAdmin } = useAuth(); // Check if user is logged in

  return isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
