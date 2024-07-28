import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProduct } from "../actions/products";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: null,
    featureProducts: null,
    singleProduct: {},
  },
  extraReducers: (builder) => {
    builder

      // GET Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.featureProducts = action.payload.featuredData;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })

      // GET Product
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
