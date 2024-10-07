import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethod";

const UpdateParcel = () => {
  const [parcel, setParcel] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const parcelId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get(`/Parcels/GetById?id=${parcelId}`);
        setParcel(res.data.result);
        setInputs(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleUpdate = async () => {
    try {
      await publicRequest.put(`/Parcels/updateParcel?id=${parcelId}`, inputs);
      // Redirect to /getallparcels after successful update
      navigate("/getallparcels");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <h2 className="font-semibold"> Parcel</h2>
      <div className="flex">
        <div className="m-[20px]">
          <div className="flex flex-col my-[20px]">
            <label htmlFor="From">From</label>
            <input
              type="text"
              name="from"
              value={inputs.from || ""}
              onChange={handleChange}
              placeholder={parcel.from}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="To">To</label>
            <input
              type="text"
              placeholder={parcel.to}
              name="to"
              value={inputs.to || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="Sender Name">Sender Name</label>
            <input
              type="text"
              name="senderName"
              value={inputs.senderName || ""}
              onChange={handleChange}
              placeholder={parcel.senderName}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="Recipient Name">Recipient Name</label>
            <input
              type="text"
              name="recipientName"
              value={inputs.recipientName || ""}
              onChange={handleChange}
              placeholder={parcel.recipientName}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="Sender Email">Sender Email</label>
            <input
              type="text"
              name="senderEmail"
              value={inputs.senderEmail || ""}
              onChange={handleChange}
              placeholder={parcel.senderEmail}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="Recipient Email">Recipient Email</label>
            <input
              type="text"
              name="recipientEmail"
              value={inputs.recipientEmail || ""}
              onChange={handleChange}
              placeholder={parcel.recipientEmail}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
        </div>
        <div className="m-[20px]">
          <div className="flex flex-col my-[20px]">
            <label htmlFor="Weight">Weight</label>
            <input
              type="Number"
              name="weight"
              value={inputs.weight || ""}
              onChange={handleChange}
              placeholder={parcel.weight}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="Cost">Cost</label>
            <input
              type="Number"
              name="cost"
              value={inputs.cost || ""}
              onChange={handleChange}
              placeholder={parcel.cost}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="Date">Date</label>
            <input
              type="date"
              name="date"
              value={inputs.date || ""}
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="Note">Note</label>
            <textarea
              name="note"
              value={inputs.note || ""}
              onChange={handleChange}
              placeholder={parcel.note}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="Status">Status</label>
            <textarea
              name="status"
              value={inputs.status || ""}
              onChange={handleChange}
              placeholder={parcel.status}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <button
            className="bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[300px]"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>

        <div className="flex flex-col">
          <h2 className="font-semibold">Feedback</h2>
          <span>Goods received in good condition</span>
          {parcel.status === "Pending" || parcel.status === "Delivered" ? (
            <span className="text-red-500 text-[18px]">Pending</span>
          ) : (
            <span className="text-green-500 text-[18px]">Delivered</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateParcel;
