import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAddUser = async () => {
    try {
      // Perform the registration request
      const response = await publicRequest.post("/Users/register", inputs);

      // Always show success message and redirect if registration was successful
      if (response.data.isSuccess) {
        setInputs({});
        toast.success("User has been successfully registered");

        setTimeout(() => {
          navigate("/users");
        }, 2000);
      } else {
        // Handle other server-side validation errors
        toast.error(
          "Registration failed: " +
            (response.data.errorMessages?.join(", ") || "Unknown error")
        );
      }
    } catch (error) {
      console.log(error);

      // Determine the appropriate error message
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response && error.response.data) {
        const errorMessages = error.response.data.errorMessages;
        if (Array.isArray(errorMessages) && errorMessages.length > 0) {
          // Check for specific email existence error
          if (errorMessages.includes("Email Already Exists")) {
            errorMessage =
              "Email already exists. Please use a different email.";
          } else {
            errorMessage = errorMessages.join(", ");
          }
        }
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <h2 className="font-semibold">New User</h2>
      <div className="flex flex-col my-[20px]">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          onChange={handleChange}
          placeholder="Please enter your Full Name"
          className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
        />
      </div>
      <div className="flex flex-col my-[20px]">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="Please enter your email"
          className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
        />
      </div>

      <div className="flex flex-col my-[20px]">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          onChange={handleChange}
          placeholder="Please enter your age"
          className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
        />
      </div>
      <div className="flex flex-col my-[20px]">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          onChange={handleChange}
          placeholder="Please enter your country"
          className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
        />
      </div>
      <div className="flex flex-col my-[20px]">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          placeholder="Please enter your address"
          className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
        />
      </div>
      <div className="flex flex-col my-[20px]">
        <label htmlFor="status">Status</label>
        <input
          type="text"
          name="status"
          onChange={handleChange}
          placeholder="Please enter the status"
          className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
        />
      </div>
      <div className="flex flex-col my-[20px]">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          name="role"
          onChange={handleChange}
          placeholder="Please enter your role"
          className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
        />
      </div>
      <button
        className="bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[300px]"
        onClick={handleAddUser}
      >
        Create
      </button>
      <ToastContainer />
    </div>
  );
};

export default NewUser;
