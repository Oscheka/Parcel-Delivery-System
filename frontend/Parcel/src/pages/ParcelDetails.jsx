import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ParcelDetails = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-[3%] mr-[5%] ml-[5%]">
      <div className="bg-[#D9D9D9] h-[80vh] w-[60vw] rounded-md">
        <Link to="/myparcels">
          <FaArrowLeft className="text-[18px] m-2 cursor-pointer" />
        </Link>

        <div className="flex justify-between">
          <div className="flex-1">
            <ul className="m-3">
              <li className="mt-3">From: Ontario, USA</li>
              <li className="mt-3">Weigh: 200kg</li>
              <li className="mt-3">Date: Date: 26/05/2024 </li>
              <li className="mt-3">Sender: Joseph Smith</li>
              <li className="mt-3">To : Ontario, USA</li>
              <li className="mt-3">Cost : $340</li>
              <li className="mt-3">Receiver : Arnold Thorpe</li>
              <li className="mt-3">Track ID: 001</li>
              <li className="mt-3">Note : Lorem</li>
            </ul>
            <button className="bg-[#555] text-white w-[100px] cursor-pointer padding-[10px] m-[20px]">
              Pending
            </button>
          </div>
          <div className="flex-1 mr-[20%]">
            <ul className="m-3">
              <li className="mt-3">Sender Email: Mary Thorpe</li>
              <li className="mt-3">Recipient Email: mary@gmail.com</li>
            </ul>
            <textarea
              cols={50}
              rows={7}
              name=""
              id=""
              placeholder="Leave a feedback"
              className="outline-none p-[5px]"
            ></textarea>
            <button className="bg-[#1E1E1E] w-[200px] p-[10px] text-white cursor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetails;
