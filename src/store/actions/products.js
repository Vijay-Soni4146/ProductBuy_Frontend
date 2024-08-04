import { createAsyncThunk } from "@reduxjs/toolkit";
// import { updateCategories } from "../reducers/products";

import axios from "axios";
import { errorGlobal } from "../reducers/notifications";

const API = import.meta.env.VITE_API_URL;

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { dispatch }) => {
    try {
      const request = await axios.get(`${API}/products`);

      const products = request.data.Products;

      const featuredData = products.filter((curElem) => {
        return curElem.featured === true;
      });
      return { products, featuredData };
    } catch (err) {
      dispatch(errorGlobal("Failed to fetch products"));
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, { dispatch }) => {
    try {
      const request = await axios.get(`${API}/products/${id}`);
      return request.data;
    } catch (err) {
      dispatch(errorGlobal("Failed to fetch product"));
    }
  }
);
