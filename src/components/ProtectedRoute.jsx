import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAdmin } = useAuth(); // ✅ Ensure authentication works

  return isAdmin ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
