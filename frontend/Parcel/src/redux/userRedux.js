import { createSlice } from "@reduxjs/toolkit";

// Create a slice for user authentication
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
    },
  },
});

// Export actions for use in components
export const { loginStart, loginSuccess, logout, loginFailure } =
  userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
