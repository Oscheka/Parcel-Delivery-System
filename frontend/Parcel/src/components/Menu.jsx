import React from "react";
import {
  FaBox,
  FaCalendarAlt,
  FaChartBar,
  FaClipboardList,
  FaCog,
  FaElementor,
  FaHdd,
  FaHome,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="h-[90vh] shadow-xl flex items-start justify-center">
      <ul className="flex flex-col items-center">
        <Link
          to="/"
          className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]"
        >
          <li className="flex items-center">
            <FaHome className="mr-[15px]" />
            Home
          </li>
        </Link>

        <Link
          to="/profile"
          className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]"
        >
          <li className="flex items-center">
            <FaUser className="mr-[15px]" />
            Profile
          </li>
        </Link>

        <Link
          to="/getallparcels"
          className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]"
        >
          <li className="flex items-center">
            <FaBox className="mr-[15px]" />
            Parcels
          </li>
        </Link>

        <Link
          to="/users"
          className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]"
        >
          <li className="flex items-center">
            <FaUsers className="mr-[15px]" />
            Users
          </li>
        </Link>

        <li className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]">
          <FaClipboardList className="mr-[15px]" />
          Orders
        </li>
        <li className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]">
          <FaElementor className="mr-[15px]" />
          Elements
        </li>
        <li className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]">
          <FaCog className="mr-[15px]" />
          Settings
        </li>
        <li className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]">
          <FaHdd className="mr-[15px]" />
          Backups
        </li>

        <li className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]">
          <FaChartBar className="mr-[15px]" />
          Charts
        </li>
        <li className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]">
          <FaClapperboard className="mr-[15px]" />
          All Logs
        </li>
        <li className="flex items-center text-[#D7D7D7] text-[20px] hover:text-[#E9EB77] cursor-pointer mt-[20px]">
          <FaCalendarAlt className="mr-[15px]" />
          Calendar
        </li>
      </ul>
    </div>
  );
};

export default Menu;
