import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  // Get the logged-in user from local storage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  if (requiredRole && loggedInUser.role !== requiredRole) {
    // Redirect to home or "not authorized" if the role doesn't match
    return <Navigate to="/" />;
  }

  // Render the child component if all checks pass
  return children;
};

export default PrivateRoute;
