import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import cartMiddleware from "./cartMiddleware";

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware)
});