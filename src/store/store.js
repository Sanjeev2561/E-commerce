import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartslice";
import wishlistReducer from "../slice/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});