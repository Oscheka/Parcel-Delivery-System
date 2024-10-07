import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { useSelector } from "react-redux";

const Parcels = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getParcels = async () => {
      console.log(user.currentUser.role);

      console.log(user.currentUser);

      if (user.currentUser && user.currentUser.email) {
        try {
          const requestUrl = "https://localhost:44375/api/Parcels/me"; // Ensure this is the correct endpoint

          const res = await publicRequest.post(requestUrl, {
            email: user.currentUser.email,
          });

          if (res.data.isSuccess) {
            setData(res.data.result);
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
    console.log(data);

    getParcels();
  }, [user.currentUser]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "senderName", headerName: "Sender Name", width: 200 },
    { field: "recipientName", headerName: "Recipient Name", width: 200 },
    { field: "from", headerName: "From", width: 150 },
    { field: "to", headerName: "To", width: 150 },
    { field: "weight", headerName: "Weight (kg)", width: 130 },
    { field: "cost", headerName: "Cost ($)", width: 130 },
    { field: "createdAt", headerName: "CreatedAt", width: 130 },

    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/parcel/${params.row.id}`}>
    //           <button className="bg-teal-500 text-white cursor-pointer w-[70px]">
    //             Edit
    //           </button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <FaTrash
    //           className="text-red-500 cursor-pointer m-2"
    //           onClick={() => handleDelete(params.row.id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  // useEffect(() => {
  //   const getParcels = async () => {
  //     try {
  //       const res = await publicRequest.get("/Parcels/GetAll");
  //       setData(res.data.result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getParcels();
  // }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await publicRequest.delete(`/Parcels/deleteParcel?id=${id}`);
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center mt-[3%] mr-[5%] ml-[5%]">
      <div className="bg-[#fff] h-auto w-[70vw] rounded-md p-[30px]">
        <Link to="/myparcels">
          <FaArrowLeft className="text-[18px] m-2 cursor-pointer" />
        </Link>

        <div className="flex justify-between p-[10px]">
          <span className="text-[18px]">All Parcels</span>
          <span className="font-semibold text-[#444]">
            {user.currentUser.email}
          </span>
        </div>

        <div className="p-3">
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.id}
            disableSelectionOnClick
            pageSize={10}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Parcels;
