// import { publicRequest } from "../requestMethod";
// import { loginFailure, loginStart, loginSuccess } from "./userRedux";

// export const loginUser = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await publicRequest.post("/Users/login/", user);
//     if (res.data.isSuccess) {
//       dispatch(loginSuccess(res.data.result)); // Make sure to use the correct path
//     } else {
//       throw new Error("Login failed");
//     }
//   } catch (error) {
//     dispatch(loginFailure());
//   }
// };
import { publicRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const loginUser = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/Users/login/", user);

    if (res.data.isSuccess) {
      // Ensure that res.data.result includes the user role
      dispatch(loginSuccess(res.data.result)); // Update with the correct path to the user object
    } else {
      throw new Error(res.data.errorMessages || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error); // Log error for debugging
    dispatch(loginFailure());
  }
};
