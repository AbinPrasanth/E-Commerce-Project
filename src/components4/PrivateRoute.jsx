import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../components1/UserContext"; 

const PrivateRoute = ({ children, requiredRole }) => {
  const { currentUser, isAuthenticated } = useUser();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && currentUser.role?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
