// import React, { useEffect, useState } from "react";
// import { FaArrowLeft, FaTrash, FaEdit } from "react-icons/fa"; // Import the update icon
// import { Link } from "react-router-dom";
// import { DataGrid } from "@mui/x-data-grid";
// import { publicRequest } from "../requestMethod"; // Adjust import based on your structure

// const AllParcels = () => {
//   const [rows, setRows] = useState([]); // State for rows

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     { field: "senderName", headerName: "Sender Name", width: 200 },
//     { field: "recipientName", headerName: "Recipient Name", width: 200 },
//     { field: "from", headerName: "From", width: 150 },
//     { field: "to", headerName: "To", width: 150 },
//     { field: "weight", headerName: "Weight (kg)", width: 130 },
//     { field: "cost", headerName: "Cost ($)", width: 130 },
//     {
//       field: "edit",
//       headerName: "Edit",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <Link to={"/updateparcels/" + params.row.id}>
//             <FaEdit className="text-teal-300 cursor-pointer" size={20} />
//           </Link>
//         );
//       },
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <FaTrash
//             className="text-red-500 cursor-pointer m-[10px]"
//             onClick={() => handleDelete(params.row.id)}
//           />
//         );
//       },
//     },
//   ];

//   const handleDelete = async (id) => {
//     // Implement your delete logic here
//     console.log("Delete parcel with ID:", id);
//     // Example: Make a DELETE request to the server
//     try {
//       await publicRequest.delete(`/Parcels/${id}`); // Adjust the endpoint as needed
//       // After deletion, refresh the rows
//       fetchParcels();
//     } catch (error) {
//       console.error("Error deleting parcel:", error);
//     }
//   };

//   const fetchParcels = async () => {
//     try {
//       const res = await publicRequest.get("/Parcels/GetAll"); // Adjust endpoint to fetch parcels
//       setRows(res.data.result.result); // Update the rows state with fetched data
//     } catch (error) {
//       console.error("Error fetching parcels:", error);
//     }
//   };

//   useEffect(() => {
//     fetchParcels(); // Fetch parcels on component mount
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center mt-[3%] mr-[5%] ml-[5%]">
//       <div className="bg-[#fff] h-auto w-[70vw] rounded-md p-[30px]">
//         <Link to="/myparcels">
//           <FaArrowLeft className="text-[18px] m-2 cursor-pointer" />
//         </Link>

//         <div className="flex justify-between p-[10px]">
//           <span className="text-[18px]">All Parcels</span>
//           <span className="font-semibold">Alok Mondala</span>
//         </div>

//         <div className="p-3">
//           <DataGrid rows={rows} columns={columns} checkboxSelection />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllParcels;

// import React, { useEffect, useState } from "react";
// import { FaArrowLeft, FaTrash, FaEdit } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { DataGrid } from "@mui/x-data-grid";
// import { publicRequest } from "../requestMethod";

// const AllParcels = () => {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     { field: "senderName", headerName: "Sender Name", width: 200 },
//     { field: "recipientName", headerName: "Recipient Name", width: 200 },
//     { field: "from", headerName: "From", width: 150 },
//     { field: "to", headerName: "To", width: 150 },
//     { field: "weight", headerName: "Weight (kg)", width: 130 },
//     { field: "cost", headerName: "Cost ($)", width: 130 },
//     {
//       field: "edit",
//       headerName: "Edit",
//       width: 150,
//       renderCell: (params) => (
//         <Link to={`/updateparcels/${params.row.id}`}>
//           <FaEdit className="text-teal-300 cursor-pointer" size={20} />
//         </Link>
//       ),
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       width: 150,
//       renderCell: (params) => (
//         <FaTrash
//           className="text-red-500 cursor-pointer m-[10px]"
//           onClick={() => handleDelete(params.row.id)}
//         />
//       ),
//     },
//   ];

//   const handleDelete = async (id) => {
//     console.log("Delete parcel with ID:", id);
//     try {
//       await publicRequest.delete(`/Parcels/${id}`);
//       fetchParcels(); // Refresh the data
//     } catch (error) {
//       console.error("Error deleting parcel:", error);
//     }
//   };

//   const fetchParcels = async () => {
//     setLoading(true);
//     try {
//       const res = await publicRequest.get("/Parcels/GetAll");
//       setRows(res.data.result);
//     } catch (error) {
//       console.error("Error fetching parcels:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchParcels();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Display loading state
//   }

//   return (
//     <div className="flex flex-col items-center justify-center mt-[3%] mr-[5%] ml-[5%]">
//       <div className="bg-[#fff] h-auto w-[70vw] rounded-md p-[30px]">
//         <Link to="/myparcels">
//           <FaArrowLeft className="text-[18px] m-2 cursor-pointer" />
//         </Link>

//         <div className="flex justify-between p-[10px]">
//           <span className="text-[18px]">All Parcels</span>
//           <span className="font-semibold">Alok Mondala</span>
//         </div>

//         <div className="p-3">
//           <DataGrid rows={rows} columns={columns} checkboxSelection />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllParcels;

import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { publicRequest } from "../requestMethod";
import { useSelector } from "react-redux"; // Import useSelector

const AllParcels = () => {
  // const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const user = useSelector((state) => state.user); // Access user details from Redux store
  console.log("User Details:", user.currentUser); // Log user details

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "senderName", headerName: "Sender Name", width: 200 },
    { field: "recipientName", headerName: "Recipient Name", width: 200 },
    { field: "from", headerName: "From", width: 150 },
    { field: "to", headerName: "To", width: 150 },
    { field: "weight", headerName: "Weight (kg)", width: 130 },
    { field: "cost", headerName: "Cost ($)", width: 130 },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <Link to={`/updateparcels/${params.row.id}`}>
          <FaEdit className="text-teal-300 cursor-pointer" size={20} />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <FaTrash
          className="text-red-500 cursor-pointer m-[10px]"
          onClick={() => handleDelete(params.row.id)}
        />
      ),
    },
  ];

  const handleDelete = async (id) => {
    console.log("Delete parcel with ID:", id);
    try {
      await publicRequest.delete(`/Parcels/${id}`);
      fetchParcels(); // Refresh the data
    } catch (error) {
      console.error("Error deleting parcel:", error);
    }
  };

  const fetchParcels = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get("/Parcels/GetAll");
      setData(res.data.result);
    } catch (error) {
      console.error("Error fetching parcels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  // return (
  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <div className="flex items-center justify-between">
        <h1 className="m-[20px] text-[20px]">All Parcels</h1>

        <Link to="/newparcel">
          <button className="bg-[#1E1E1E] text-white p-[10px] cursor-pointer">
            New Parcel
          </button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
      />
    </div>
  );
  //   <div className="flex flex-col items-center justify-center mt-[3%] mr-[5%] ml-[5%]">
  //     <div className="bg-[#fff] h-auto w-[70vw] rounded-md p-[30px]">
  //       <Link to="/myparcels">
  //         <FaArrowLeft className="text-[18px] m-2 cursor-pointer" />
  //       </Link>

  //       <div className="flex justify-between p-[10px]">
  //         <span className="text-[18px]">All Parcels</span>
  //         <span className="font-semibold">Alok Mondala</span>
  //       </div>

  //       <div className="p-3">
  //         <DataGrid rows={rows} columns={columns} checkboxSelection />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AllParcels;
