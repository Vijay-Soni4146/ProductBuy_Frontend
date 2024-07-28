import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { getAuthHeader } from "./users";
import { errorGlobal } from "../reducers/notifications";

const API = import.meta.env.VITE_API_URL;
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;

export const checkout = createAsyncThunk(
  "carts/checkout",
  async (_, { rejectWithValue }) => {
    try {
      let localCartData = localStorage.getItem("VijayCart");
      let products;
      if (!localCartData || localCartData.length < 0) {
        products = [];
      } else {
        products = JSON.parse(localCartData);
      }
      const response = await axios.post(
        `${API}/users/checkout`,
        { cart: products },
        getAuthHeader()
      );
      // console.log(response.data);
      if (response.status === 200) {
        const { sessionId } = response.data;
        localStorage.setItem("paymentInProgress", "true");
        const stripe = Stripe(STRIPE_PUB_KEY);
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error("Stripe checkout error:", error.message);
          dispatch(errorGlobal("Failed to checkout"));
          return rejectWithValue(error.message);
        }

        localStorage.removeItem("VijayCart");
      }
    } catch (err) {
      // console.log(err);
      if (err.response.status === 401) {
        console.log("Please login");
        dispatch(errorGlobal("Please login"));
      }
      throw err;
    }
  }
);

export const getOrders = createAsyncThunk(
  "carts/orders",
  async (_, { dispatch }) => {
    try {
      const request = await axios.get(`${API}/users/orders`, getAuthHeader());
      return request.data.order;
    } catch (err) {
      dispatch(errorGlobal("Please try again after sometime"));
      throw err;
    }
  }
);
