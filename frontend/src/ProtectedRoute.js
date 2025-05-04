import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, element }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtectedRoute;
