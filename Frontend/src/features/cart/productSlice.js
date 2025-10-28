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
      // Preserve images/mainImage and other metadata so components can render images correctly
      state.selectedProduct = {
        id: action.payload.id,
        name: action.payload.name,
        brand: action.payload.brand,
        price: action.payload.price,
        priceNow: action.payload.priceNow || action.payload.price,
        priceOld: action.payload.priceOld || action.payload.oldPrice || action.payload.oldprice || null,
        // image (single) and images (array) support
        image: action.payload.image || action.payload.mainImage || null,
        images: action.payload.images || [],
        mainImage: action.payload.mainImage || (action.payload.images && action.payload.images[0]) || action.payload.image || null,
        quantity: action.payload.quantity || 1,
        colors: action.payload.colors || [],
        seller: action.payload.seller || "Unknown",
        details: action.payload.details || [],
        specs: action.payload.specs || {},
        description: action.payload.description || "",
        category: action.payload.category || "",
        stock: action.payload.stock || 0,
        rating: action.payload.rating || null,
        reviews: action.payload.reviews || [],
      };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
  },
});

export const { setSelectedProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
