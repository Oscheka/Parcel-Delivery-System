import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../requestMethod"; // Adjust based on your structure
import { logout } from "../redux/userRedux";

const MyParcels = () => {
  const [open, setOpen] = useState(false);
  const [parcels, setParcels] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getParcels = async () => {
      console.log(user.currentUser);
      if (user.currentUser && user.currentUser.email) {
        try {
          const requestUrl = "https://localhost:44375/api/Parcels/me"; // Ensure this is the correct endpoint

          const res = await publicRequest.post(requestUrl, {
            email: user.currentUser.email,
          });

          if (res.data.isSuccess) {
            setParcels(res.data.result);
            console.log("Fetched Parcels:", res.data.result); // Log complete parcel details
          } else {
            console.error("Error:", res.data.errorMessages);
          }
        } catch (error) {
          console.error(
            "Error fetching parcels:",
            error.response ? error.response.data : error.message
          );
        }
      } else {
        console.error("User email is not available");
      }
    };

    getParcels();
  }, [user.currentUser]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <div className="relative flex items-end justify-end mr-[20%] mt-[3%]">
        <div>
          <span
            className="flex items-center text-white font-semibold cursor-pointer"
            onClick={handleOpen}
          >
            <FaUser className="mr-[10px]" />
            {user.currentUser.email}
          </span>
        </div>
        {open && (
          <div className="absolute top-[20px] right-0 h-[200px] w-[250px] bg-[#D9D9D9] z-[999] shadow-xl">
            <ul className="flex flex-col items-center justify-center mt-[10px]">
              <Link to="/allparcels">
                <li className="hover:text-[#fff] my-[5px] cursor-pointer">
                  All parcels
                </li>
              </Link>
              <li className="hover:text-[#fff] my-[5px] cursor-pointer">
                Statements
              </li>
              <li
                className="hover:text-[#fff] my-[5px] cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-evenly px-[5%]">
        <div className="h-[90vh] w-[60vw] rounded-md">
          <h2 className="text-[18px] text-[#D9D9D9] p-[20px]">My Parcels</h2>
          {/* {parcels.length > 0 ? (
            parcels.map((parcel) => (
              <Link to={`/parcel/${parcel.id}`}>
                <div
                  key={parcel.id}
                  className="flex justify-between bg-[#D9D9D9] h-[150px] w-[60vw] m-[20px] p-[20px] cursor-pointer"
                >
                  <div>
                    <ul>
                      <li>From: {parcel.from}</li>

                      <li>Weight: {parcel.weight} kg</li>
                      <li>
                        Date: {new Date(parcel.createdAt).toLocaleDateString()}
                      </li>
                      <li>Sender: {parcel.senderName}</li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <span>To: {parcel.to}</span>
                    <button
                      className={`text-white w-[100px] cursor-pointer padding-[5px] ${
                        parcel.status === "Pending"
                          ? "bg-[#555]"
                          : parcel.status === "Delivered"
                          ? "bg-[#45de52]"
                          : "bg-[#ccc]" // Optional: default background for other statuses
                      }`}
                    >
                      {parcel.status}
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">No parcels found.</p>
          )} */}

          {parcels.length > 0 ? (
            parcels.map((parcel) => (
              <Link key={parcel.id} to={`/parcel/${parcel.id}`}>
                <div className="flex justify-between bg-[#D9D9D9] h-[150px] w-[60vw] m-[20px] p-[20px] cursor-pointer">
                  <div>
                    <ul>
                      <li>From: {parcel.from}</li>
                      <li>Weight: {parcel.weight} kg</li>
                      <li>
                        Date: {new Date(parcel.createdAt).toLocaleDateString()}
                      </li>
                      <li>Sender: {parcel.senderName}</li>
                    </ul>
                  </div>
                  <div className="flex flex-col">
                    <span>To: {parcel.to}</span>
                    <button
                      className={`text-white w-[100px] cursor-pointer padding-[5px] ${
                        parcel.status === "Pending"
                          ? "bg-[#555]"
                          : parcel.status === "Delivered"
                          ? "bg-[#45de52]"
                          : "bg-[#ccc]"
                      }`}
                    >
                      {parcel.status}
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">No parcels found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
