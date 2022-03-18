import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { instance } from "../axios";
import { tmpShoppingCartData } from "../tmp/tmpSearchData";

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Adding item (with any set quantity)
      state.items.push(action.payload);
      console.log(current(state));
    },
    removeItem: (state, action) => {
      // Remove item from cart
      const newItems = state.items.filter((item) => item.id !== action.payload);
      state.items = newItems;
      console.log(current(state));
    },
    updateQuantity: (state, action) => {
      // Update quantity of items in cart
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.payload.id) {
          state.items[i].quantity = action.payload.quantity;
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchShoppingCartItems.fulfilled, (state, action) => {
      console.log("Successfully added shopping cart items");
    });
    builder.addCase(fetchShoppingCartItems.rejected, (state, action) => {
      console.log("Mocking shopping cart data");
      state.items = tmpShoppingCartData;
    });
  },
});

export const { addItem, removeItem, updateQuantity } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;

export const fetchShoppingCartItems = createAsyncThunk(
  "shoppingCart/fetchItems",
  async () => {
    const response = await instance.get("PLACEHOLDER FOR SHOPPING CART");
    return response.data;
  }
);
