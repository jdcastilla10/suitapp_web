import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, allowedUser, user }) => {

  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedUser && user.usuario !== allowedUser) {
    return <Navigate to="/" />;
  }

  return children;
};