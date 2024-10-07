// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="h-[100px] bg-[#E9EB77] flex items-center justify-between px-10">
//       <Link to="/">
//         <img src="/logo.png" height="200px" width="200px" alt="" />
//       </Link>
//       <Link to="/l">
//         <button className="bg-[#1E1E1E] p-[10px] text-gray-300 cursor-pointer border-none w-[100px]">
//           Login
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux"; // Adjust the import path as needed

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login after logging out
  };

  return (
    <div className="h-[100px] bg-[#E9EB77] flex items-center justify-between px-10">
      <Link to="/">
        <img src="/logo.png" height="200px" width="200px" alt="Logo" />
      </Link>
      <button
        className="bg-[#1E1E1E] p-[10px] text-gray-300 cursor-pointer border-none w-[100px]"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
