import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,

  loading: false,
  signUpData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Store JWT token
    setToken(state, action) {
      state.token = action.payload;
    },

    // Global loading spinner toggle
    setLoading(state, action) {
      state.loading = action.payload;
    },

    // Temporarily store user details before OTP verification
    setSignUpData(state, action) {
      state.signUpData = action.payload;
    },
  },
});

export const { setToken, setLoading, setSignUpData } = authSlice.actions;

export default authSlice.reducer;
