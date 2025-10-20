// src/features/product/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = {
        id: action.payload.id,
        name: action.payload.name,
        brand: action.payload.brand,
        price: action.payload.price,
        oldPrice: action.payload.oldPrice,
        image: action.payload.image,
        quantity: action.payload.quantity || 1,
        colors: action.payload.colors || [],
        seller: action.payload.seller || "Unknown",
        details: action.payload.details || [],
        specs: action.payload.specs || {},
      };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
  },
});

export const { setSelectedProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
