// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // {id, name, price (number), image, quantity}
  },
  reducers: {
    addToCart: (state, action) => {
  state.items.push(action.payload);

      // Ensure price is always a number
      const price =
        typeof action.payload.priceNow === "string"
          ? parseFloat(action.payload.priceNow.replace("$", ""))
          : action.payload.priceNow || 0;

      const existing = state.items.find((item) => item.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          image: product.image,
          price: price, // ✅ number only
          quantity: 1,
        });
      }
    },
   


    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
