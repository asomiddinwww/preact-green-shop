import { createSlice, type PayloadAction, current } from "@reduxjs/toolkit";
import type { ShopCardType } from "../@types/inedx";

interface InitialStateType {
  data: ShopCardType[];
  coupon: number;
  wishlist: ShopCardType[];
}

const getStoredData = (key: string): ShopCardType[] => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    return [];
  }
};

const initialState: InitialStateType = {
  data: getStoredData("shop"),
  wishlist: getStoredData("wishlist"),
  coupon: 0,
};

const shopSlice = createSlice({
  name: "shop-slice",
  initialState,
  reducers: {
    getData(state, { payload }: PayloadAction<ShopCardType>) {
      const exists = state.data.find((value) => value._id === payload._id);
      if (exists) {
        state.data.forEach((value) => {
          if (value._id === payload._id) {
            value.counter += 1;
            value.userPrice = value.price * value.counter;
          }
        });
      } else {
        state.data.push({ ...payload, counter: 1, userPrice: payload.price });
      }
      localStorage.setItem("shop", JSON.stringify(current(state).data));
    },

    deleteData(state, { payload }) {
      state.data = state.data.filter((value) => value._id !== payload);
      localStorage.setItem("shop", JSON.stringify(current(state).data));
    },

    toggleWishlist(state, { payload }: PayloadAction<ShopCardType>) {
      const exists = state.wishlist.find((item) => item._id === payload._id);

      if (exists) {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== payload._id,
        );
      } else {
        state.wishlist.push(payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(current(state).wishlist));
    },

    removeFromWishlist(state, { payload }: PayloadAction<string>) {
      state.wishlist = state.wishlist.filter((item) => item._id !== payload);
      localStorage.setItem("wishlist", JSON.stringify(current(state).wishlist));
    },

    increment(state, { payload }) {
      state.data = state.data.map((value) => {
        if (value._id === payload) {
          return {
            ...value,
            counter: (value.counter += 1),
            userPrice: value.price * value.counter,
          };
        }
        return value;
      });
      localStorage.setItem("shop", JSON.stringify(current(state).data));
    },
    decrement(state, { payload }: PayloadAction<string>) {
      const product = state.data.find((value) => value._id === payload);
      if (product && product.counter > 1) {
        product.counter -= 1;
        product.userPrice = product.price * product.counter;
      }
      localStorage.setItem("shop", JSON.stringify(current(state).data));
    },
    getCoupon(state, { payload }) {
      state.coupon = payload;
    },
  },
});

export const {
  getData,
  deleteData,
  increment,
  decrement,
  toggleWishlist,
  removeFromWishlist,
  getCoupon,
} = shopSlice.actions;

export default shopSlice.reducer;
