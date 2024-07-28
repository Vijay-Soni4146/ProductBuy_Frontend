import { createAsyncThunk } from "@reduxjs/toolkit";
// import { updateCategories } from "../reducers/products";

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const setProducts = createAsyncThunk("filters/setProducts", async () => {
  const request = await axios.get(`${API}/products`);

  const data = request.data.Products;

  let priceArr = request.data.Products.map((curElem) => curElem.price);

  let maxPrice = Math.max(...priceArr);

  return { data, maxPrice };
});

// export const getProduct = createAsyncThunk(
//   "products/getProduct",
//   async (id) => {
//     const request = await axios.get(`${API}/${id}`);

//     return request.data;
//   }
// );
