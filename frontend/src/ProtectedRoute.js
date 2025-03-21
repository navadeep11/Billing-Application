import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, element }) => {
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return element;
};

export default ProtectedRoute;
