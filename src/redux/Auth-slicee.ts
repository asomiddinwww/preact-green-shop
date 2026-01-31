import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  user: any | null;
}

const getInitialUser = () => {
  try {
    const savedUser = Cookies.get("user") || localStorage.getItem("user");
    return savedUser && savedUser !== "undefined"
      ? JSON.parse(savedUser)
      : null;
  } catch (error) {
    console.error("User parse error:", error);
    return null;
  }
};

const initialState: AuthState = {
  token: Cookies.get("token") || localStorage.getItem("token") || null,
  user: getInitialUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: any }>,
    ) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      // Hammasini tozalash
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
