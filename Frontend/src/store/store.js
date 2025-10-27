// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/cart/productSlice";
import searchReducer from "../features/search/searchSlice";
import orderReducer from "../features/order/orderSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    product: productReducer,
    order: orderReducer,
    category: categoryReducer, // you can add more slices later
  },
});
