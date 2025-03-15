import React from "react";
import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "./App/Services/AuthenticationApi";

const ProtectedRoute = ({ element }) => {
  const { data, isLoading } = useGetUserQuery();

  if (isLoading) return <div>Loading...</div>; // Show loading while checking authentication

  return data?.user ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
