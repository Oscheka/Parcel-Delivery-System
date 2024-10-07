import React, { useState } from "react";
import Footer from "../components/Footer";
import { Navigate } from "react-router-dom";
import { loginUser } from "../redux/apiCalls"; // Ensure this import is correct
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      try {
        await loginUser(dispatch, { email, password });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Redirect based on user role
  if (user.currentUser) {
    if (user.currentUser.role === "admin") {
      return <Navigate to="/getallparcels" />;
    } else if (user.currentUser.role === "User") {
      return <Navigate to="/myparcels" />;
    }
  }

  return (
    <div>
      <div className="h-[80vh] flex items-center justify-evenly p-[50px] text-gray-300">
        <div>
          <h2 className="text-[#d9d9d9] font-semibold text-[35px]">
            SendIT Admin
          </h2>
          <img src="/hero.png" alt="" />
        </div>
        <div className="h-[450px] w-[450px] bg-[#E9EB77] rounded-md">
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="flex items-center justify-center bg-[#fff] p-[20px] w-[350px] m-[10%] outline-none"
          />
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex items-center justify-center bg-[#fff] p-[20px] w-[350px] mt-[10%] ml-[10%] outline-none"
            />
            <span
              style={{ display: "inline", cursor: "pointer", fontSize: "20px" }}
              onClick={handleTogglePassword}
            >
              {showPassword ? "👁️" : "🔒"}
            </span>
          </div>
          <button
            className="bg-[#1e1e1e] w-[350px] p-[15px] text-white font-semibold text-[18px] m-[10%]"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {error && (
            <span className="text-red-500">
              Please make sure that you have used correct email and password
            </span>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
