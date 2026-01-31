import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user_data") || "null"), // Refreshda ma'lumot yo'qolmasligi uchun
    token: localStorage.getItem("access_token") || null,
  },
  reducers: {
    updateUserData: (state, action: PayloadAction<any>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setCredentials: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { updateUserData, setCredentials } = authSlice.actions;
export default authSlice.reducer;
