import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "./modal-store";

import userSlice from "./user-slice";
import shopSlice from "./shop-slice";
import authSlice from "./auth-slice";

export const store = configureStore({
  reducer: {
    modalSlice,
    shopSlice,
    userSlice,
    authSlice,
  },
});

export type RootStore = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
