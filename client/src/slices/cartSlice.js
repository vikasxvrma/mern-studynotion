import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).length
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const course = action.payload;

      const exists = state.items.find(
        (item) => item._id === course._id
      );

      if (exists) {
        toast.error("Item already in cart");
        return;
      }

      state.items.push(course);
      state.totalItems = state.items.length;

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );

      toast.success("Item added to cart");
    },
    

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );

      state.totalItems = state.items.length;

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );

      toast.success("Item removed from cart");
    },

    resetCart(state) {
      state.items = [];
      state.totalItems = 0;

      localStorage.removeItem("cartItems");

      toast.success("Cart cleared");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
