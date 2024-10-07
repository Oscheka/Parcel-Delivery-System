// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export const PrivateRoute = ({ children }) => {
//   const user = useSelector((state) => state.user);

//   return user.currentUser.role === "User" ? children : <Navigate to="/login" />;
// };

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // Check if user is logged in and has a role
  if (!user.currentUser || user.currentUser.role !== "User") {
    return <Navigate to="/login" />;
  }

  return children; // Render the children if the condition is satisfied
};
