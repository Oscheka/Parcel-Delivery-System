// import axios from "axios";

// // Create an Axios instance for making API requests
// export const publicRequest = axios.create({
//   baseURL: "https://localhost:44375/api", // Base URL for the API
//   headers: {
//     "Content-Type": "application/json", // Default content type for requests
//   },
// });

import axios from "axios";

// Create an Axios instance for making API requests
export const publicRequest = axios.create({
  baseURL: "https://localhost:44375/api", // Base URL for the API
  headers: {
    "Content-Type": "application/json", // Default content type for requests
    // Add authorization header if required
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your method of storing tokens
  },
});
