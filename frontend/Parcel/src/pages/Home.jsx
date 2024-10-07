import React, { useEffect, useState } from "react";
import { HiArrowLongDown, HiArrowSmallUp } from "react-icons/hi2";
import { PieChart } from "@mui/x-charts/PieChart";
import { publicRequest } from "../requestMethod";

const Home = () => {
  const [pendingParcels, setPendingParcels] = useState(0);
  const [deliveredParcels, setDeliveredParcels] = useState(0);
  const [userCount, setUserCount] = useState(0); // Use a number for userCount

  useEffect(() => {
    const getPendingParcels = async () => {
      try {
        const res = await publicRequest.get("/Parcels/TotalPendingParcels");
        setPendingParcels(res.data.result.totalPendingParcels);
      } catch (error) {
        console.log(error);
      }
    };
    getPendingParcels();
  }, []);

  useEffect(() => {
    const getDeliveredParcels = async () => {
      try {
        const res = await publicRequest.get("/Parcels/TotalDeliveredParcels");
        setDeliveredParcels(res.data.result.totalDeliveredParcels);
      } catch (error) {
        console.log(error);
      }
    };
    getDeliveredParcels();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await publicRequest.get("/Users/GetUserCount");
        // Correctly extract the number of users from the response
        setUserCount(res.data.result.totalUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <div className="flex flex-col text-[#d9d9d9] h-[250px] w-[350px] shadow-lg m-[20px]">
          <div className="flex flex-col items-center justify-center mt-[10%]">
            <h1 className="text-[20px] font-semibold">Users</h1>
            <div className="flex items-center mt-[20px]">
              <HiArrowSmallUp className="text-[28px] text-green-500" />
              <HiArrowLongDown className="text-[28px] text-red-500" />
            </div>
            <span className="mt-[20px] text-[18px]">{userCount}</span>
          </div>
        </div>
        <div className="flex flex-col text-[#d9d9d9] h-[250px] w-[350px] shadow-lg m-[20px]">
          <div className="flex flex-col items-center justify-center mt-[10%]">
            <h1 className="text-[20px] font-semibold">Delivered Parcels</h1>
            <div className="flex items-center mt-[20px]">
              <HiArrowSmallUp className="text-[28px] text-green-500" />
              <HiArrowLongDown className="text-[28px] text-red-500" />
            </div>
            <span className="mt-[20px] text-[18px]">{deliveredParcels}</span>
          </div>
        </div>
        <div className="flex flex-col text-[#d9d9d9] h-[250px] w-[350px] shadow-lg m-[20px]">
          <div className="flex flex-col items-center justify-center mt-[10%]">
            <h1 className="text-[20px] font-semibold">Pending Parcels</h1>
            <div className="flex items-center mt-[20px]">
              <HiArrowSmallUp className="text-[28px] text-green-500" />
              <HiArrowLongDown className="text-[28px] text-red-500" />
            </div>
            <span className="mt-[20px] text-[18px]">{pendingParcels}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-[450px] w-[500px] text-[#fff]">
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: pendingParcels,
                    label: "Pending Percels",
                  },
                  {
                    id: 1,
                    value: deliveredParcels,
                    label: "Delivered Percels",
                  },
                  { id: 2, value: userCount, label: "Users" },
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -45,
                endAngle: 225,
                cx: 150,
                cy: 150,
              },
            ]}
          />
        </div>
        <div className="h-[350px] w-[300px] shadow-lg p-[20px]">
          <h2 className="flex px-[20px] text-[#fff]">Recent Users</h2>
          <ol className="flex font-semibold flex-col justify-end px-[20px] mt-[10px] text-[#d9d9d9]">
            <li>1. James Conteh</li>
            <li>2. Emmanuel Grey</li>
            <li>3. Thomas Smith</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Home;
