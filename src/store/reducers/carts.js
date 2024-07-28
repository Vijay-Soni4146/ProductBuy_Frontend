import { createSlice } from "@reduxjs/toolkit";
import { checkout, getOrders } from "../actions/carts";

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("VijayCart");
  if (!localCartData || localCartData.length < 0) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

export const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    loading: false,
    // cart: [],
    cart: getLocalCartData(),
    totalItem: "",
    totalAmount: "",
    shippingFee: 5000,
    status: "idle",
    orders: [],
  },
  reducers: {
    addProductToCart: (state, action) => {
      let { _id, color, amount, product } = action.payload;
      console.log(_id + color);
      let existingProduct = state.cart.find(
        (curItem) => curItem.id === _id + color
      );

      if (existingProduct) {
        let updatedCart = state.cart.map((curElem) => {
          if (curElem.id === _id + color) {
            let newAmount = curElem.amount + amount;
            if (newAmount > curElem.max) {
              newAmount = curElem.max;
            }
            return {
              ...curElem,
              amount: newAmount,
            };
          }
          return curElem;
        });
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        let cartProduct = {
          id: _id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    },
    setIncrease: (state, action) => {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let incAmount = curElem.amount + 1;

          if (incAmount >= curElem.max) {
            incAmount = curElem.max;
          }

          return {
            ...curElem,
            amount: incAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    },
    setDecrease: (state, action) => {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decAmount = curElem.amount - 1;

          if (decAmount <= 1) {
            decAmount = 1;
          }

          return {
            ...curElem,
            amount: decAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    },
    removeItem: (state, action) => {
      let updatedCart = state.cart.filter(
        (curItem) => curItem.id !== action.payload
      );

      return {
        ...state,
        cart: updatedCart,
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        cart: [],
      };
    },
    cartTotalItem: (state) => {
      let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
        let { amount } = curElem;
        initialVal = initialVal + amount;
        return initialVal;
      }, 0);
      return {
        ...state,
        totalItem: updatedItemVal,
      };
    },
    cartTotalPrice: (state) => {
      let totalPrice = state.cart.reduce((initialVal, curElem) => {
        let { price, amount } = curElem;
        initialVal = initialVal + price * amount;
        return initialVal;
      }, 0);
      return {
        ...state,
        totalAmount: totalPrice,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const {
  addProductToCart,
  removeItem,
  clearCart,
  setIncrease,
  setDecrease,
  cartTotalItem,
  cartTotalPrice,
} = cartsSlice.actions;
export default cartsSlice.reducer;
