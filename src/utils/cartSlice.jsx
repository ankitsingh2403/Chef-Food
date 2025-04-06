import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.splice(action.payload, 1); // removes item by index  // splice method take 2 argument one start index from where we want to delete by index and 2nd is count how many to delete
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem,  clearCart } = cartSlice.actions;
export default cartSlice.reducer;
