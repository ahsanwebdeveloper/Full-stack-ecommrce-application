// src/features/order/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      state.currentOrder = action.payload; // store latest invoice
      state.orders.push(action.payload); // add to history
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
    },
  },
});

export const { createOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
