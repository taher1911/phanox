import React from "react";
import toast from "react-hot-toast";

import { configureStore, createSlice } from "@reduxjs/toolkit";
const INITSTATE = {
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
};

const storeSlice = createSlice({
  name: "phanox-store",
  initialState: INITSTATE,
  reducers: {
    onAdd(state, payload) {
      const { product, qty } = payload.payload;
      const checkProductInCart = state.cartItems.find(
        (item) => item._id === product._id
      );
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === product._id
      );

      state.totalPrice += product.price * qty;
      state.totalQuantities += qty;

      if (checkProductInCart) {
        state.cartItems[productIndex] = {
          ...checkProductInCart,
          quantity: checkProductInCart.quantity + qty,
        };
      } else {
        product.quantity = qty;
        state.cartItems = [...state.cartItems, { ...product }];
      }
      state.qty = 1;
      toast.success(`${qty} ${product.name} added to the cart.`);
    },
    showCartHandler(state) {
      state.showCart = !state.showCart;
    },
    toggleCartItemQuantity(state, payload) {
      const { id, value } = payload.payload;

      const findItem = state.cartItems.find((element) => element._id === id);
      const itemIndex = state.cartItems.findIndex((el) => el._id === id);

      if (value === "inc") {
        state.totalPrice += findItem.price;
        state.totalQuantities += 1;
        state.cartItems[itemIndex] = {
          ...findItem,
          quantity: findItem.quantity + 1,
        };
      } else if (value === "dec") {
        if (findItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((el) => el._id !== id);
        } else {
          state.cartItems[itemIndex] = {
            ...findItem,
            quantity: findItem.quantity - 1,
          };
        }

        state.totalPrice -= findItem.price;
        state.totalQuantities -= 1;
      }
    },
    incQty(state) {
      state.qty++;
    },

    decQty(state) {
      if (state.qty - 1 < 1) {
        state.qty = 1;
      } else {
        state.qty--;
      }
    },
    removeFromCart(state, payload) {
      const { id } = payload.payload;
      const item = state.cartItems.find((el) => el._id === id);
      state.totalPrice -= item.price * item.quantity;
      state.totalQuantities -= item.quantity;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
    },
    paymentSucceeded(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantities = 0;
    },
  },
});

const store = configureStore({
  reducer: storeSlice.reducer,
});

export const storeActions = storeSlice.actions;
export default store;
