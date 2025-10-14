// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/cart/productSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    product: productReducer, // you can add more slices later
  },
});
