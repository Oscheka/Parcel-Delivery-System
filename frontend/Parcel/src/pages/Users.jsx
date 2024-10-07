import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "age", headerName: "Age", width: 130 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <FaTrash
              className="text-red-500 cursor-pointer m-2"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await publicRequest.get("/Users/GetUsersList");
        setData(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Perform the delete operation
      const response = await publicRequest.delete(`/Users/deleteUser`, {
        params: { id }, // Send the ID as a query parameter
      });

      // Check if the operation was successful
      if (response.data.isSuccess) {
        toast.success("User deleted successfully.");
        // Refresh the list of users
        const updatedUsers = await publicRequest.get("/Users/GetUsersList");
        setData(updatedUsers.data.result);
      } else {
        toast.error(
          "Failed to delete user: " +
            (response.data.errorMessages.join(", ") || "Unknown error")
        );
      }
    } catch (error) {
      // Display error message from the server response
      toast.error(
        "Error deleting user: " +
          (error.response?.data?.errorMessages?.join(", ") || error.message)
      );
    }
  };

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <div className="flex items-center justify-between">
        <h1 className="m-[20px] text-[20px]">All Users</h1>
        <Link to="/newuser">
          <button className="bg-[#1e1e1e] text-white p-[10px] cursor-pointer">
            New User
          </button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        getRowId={(row) => row.id}
        columns={columns}
        checkboxSelection
      />
    </div>
  );
};

export default Users;
