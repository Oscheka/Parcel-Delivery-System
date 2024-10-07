// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export const AdminRoute = ({ children }) => {
//   const user = useSelector((state) => state.user);

//   return user.currentUser.role === "admin" ? (
//     children
//   ) : (
//     <Navigate to="/login" />
//   );
// };

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // Check if user is logged in and has a role
  return user.currentUser && user.currentUser.role === "admin" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
