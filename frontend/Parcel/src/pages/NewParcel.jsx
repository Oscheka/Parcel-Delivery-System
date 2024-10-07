// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { publicRequest } from "../requestMethod";

// const NewParcel = () => {
//   const [inputs, setInputs] = useState({});

//   const handleChange = (e) => {
//     setInputs((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       console.log(inputs);
//       await publicRequest.post("/Parcels/addparcel", inputs);

//       // Clear the input fields
//       setInputs({});

//       // Show success toast
//       toast.success(
//         "Parcel has been successfully posted and emails has been sent to the Sender and Recipient!"
//       );
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to post the parcel. Please try again.");
//     }
//   };

//   return (
//     <div className="m-[30px] bg-[#fff] p-[20px]">
//       <h2 className="font-semibold">New Parcel</h2>
//       <div className="flex">
//         <div className="m-[20px]">
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">From</label>
//             <input
//               type="text"
//               name="from"
//               onChange={handleChange}
//               placeholder="Ontario USA"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">To</label>
//             <input
//               type="text"
//               name="to"
//               onChange={handleChange}
//               placeholder="Michigan USA"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">Sender Name</label>
//             <input
//               type="text"
//               name="senderName"
//               onChange={handleChange}
//               placeholder="Please Enter the Sender Name"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">Recipient Name</label>
//             <input
//               type="text"
//               name="recipientName"
//               onChange={handleChange}
//               placeholder="Please Enter the Recipient Name"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">Sender Email</label>
//             <input
//               type="text"
//               name="senderEmail"
//               onChange={handleChange}
//               placeholder="Sender Email"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">Recipient Email</label>
//             <input
//               type="text"
//               name="recipientEmail"
//               onChange={handleChange}
//               placeholder="Recipient Email"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div>
//         </div>
//         <div className="m-[20px]">
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">Weight</label>
//             <input
//               type="Number"
//               name="weight"
//               onChange={handleChange}
//               placeholder="200kg"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">Cost</label>
//             <input
//               type="Number"
//               name="cost"
//               onChange={handleChange}
//               placeholder="$200"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           {/* <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">Date</label>
//             <input
//               type="date"
//               placeholder="$200"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div> */}
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="From">Note</label>
//             <textarea
//               type="text"
//               name="note"
//               onChange={handleChange}
//               placeholder="Perishable goods"
//               className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <button
//             className="bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[300px]"
//             onClick={handleSubmit}
//           >
//             Create
//           </button>
//           <ToastContainer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewParcel;

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NewParcel = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(inputs);
      await publicRequest.post("/Parcels/addparcel", inputs);

      // Clear the input fields
      setInputs({});

      // Show success toast
      toast.success(
        "Parcel has been successfully posted and emails has been sent to the Sender and Recipient!"
      );

      // Redirect to the Parcels page after success
      setTimeout(() => {
        navigate("/parcels"); // Redirect to the desired page
      }, 2000); // Delay to allow toast to show
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <h2 className="font-semibold">New Parcel</h2>
      <div className="flex">
        <div className="m-[20px]">
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">From</label>
            <input
              type="text"
              name="from"
              onChange={handleChange}
              placeholder="Ontario USA"
              className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">To</label>
            <input
              type="text"
              name="to"
              onChange={handleChange}
              placeholder="Michigan USA"
              className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">Sender Name</label>
            <input
              type="text"
              name="senderName"
              onChange={handleChange}
              placeholder="Please Enter the Sender Name"
              className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">Recipient Name</label>
            <input
              type="text"
              name="recipientName"
              onChange={handleChange}
              placeholder="Please Enter the Recipient Name"
              className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">Sender Email</label>
            <input
              type="text"
              name="senderEmail"
              onChange={handleChange}
              placeholder="Sender Email"
              className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">Recipient Email</label>
            <input
              type="text"
              name="recipientEmail"
              onChange={handleChange}
              placeholder="Recipient Email"
              className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
            />
          </div>
        </div>
        <div className="m-[20px]">
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">Weight</label>
            <input
              type="Number"
              name="weight"
              onChange={handleChange}
              placeholder="200kg"
              className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">Cost</label>
            <input
              type="Number"
              name="cost"
              onChange={handleChange}
              placeholder="$200"
              className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">Note</label>
            <textarea
              type="text"
              name="note"
              onChange={handleChange}
              placeholder="Perishable goods"
              className="border-2 border-{#555} border-solid p-[10px] w-[300px]"
            />
          </div>
          <button
            className="bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[300px]"
            onClick={handleSubmit}
          >
            Create
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default NewParcel;
