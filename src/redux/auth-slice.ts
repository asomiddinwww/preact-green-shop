import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: any | null;
  token: string | null;
}

const getSafeUser = () => {
  const user = Cookies.get("user");
  if (!user || user === "undefined") return null;
  try {
    return JSON.parse(user);
  } catch (error) {
    return null;
  }
};

const initialState: AuthState = {
  user: getSafeUser(),
  token: Cookies.get("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; token: string }>,
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
      Cookies.remove("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
