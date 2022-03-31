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
      let isDuplicate = false;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.payload.id) {
          state.items[i].quantity += action.payload.quantity;
          isDuplicate = true;
        }
      }
      console.log(current(state));
    },
    removeItem: (state, action) => {
      // Remove item from cart
      const newItems = state.items.filter((item) => item.id !== action.payload);
      state.items = newItems;
      console.log(current(state));
    },
    updateQuantity: (state, action) => {
      // Old implementation here
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchShoppingCartItems.fulfilled, (state, action) => {
      console.log("Successfully fetched shopping cart items");
      // console.log(state)
      console.log("Fetched items: ", action);
      state.items = action.payload.cart;
    });
    builder.addCase(fetchShoppingCartItems.rejected, (state, action) => {
      console.log("Unable to fetch shopping cart items");
      // state.items = tmpShoppingCartData;
    });
    builder.addCase(removeShoppingCartItem.fulfilled, (state, action) => {
      state.items = action.payload.cart;
      console.log("removed item");
    });
    builder.addCase(removeShoppingCartItem.rejected, (state, action) => {
      console.log("Unable to remove item");
    });
    builder.addCase(
      updateShoppingCartItemQuantity.fulfilled,
      (state, action) => {
        console.log(action);
        state.items = action.payload.cart;
        console.log("Update item quantity");
      }
    );
    builder.addCase(
      updateShoppingCartItemQuantity.rejected,
      (state, action) => {
        console.log(state);
        console.log(action);
        console.log("Unable to update item quantity");
      }
    );
    builder.addCase(addShoppingCartItem.fulfilled, (state, action) => {
      console.log(state);
      console.log(action);
      state.items = action.payload.cart;
    });
    builder.addCase(addShoppingCartItem.rejected, (state, action) => {
      console.log("Unable to add new item to cart");
    });
  },
});

export const { addItem, removeItem, updateQuantity } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addItem",
  async (payload) => {
    const response = await instance
      .post("/buyer/cart", {
        itemId: payload.id,
        quantity: 1,
        usePoints: payload.usePoints,
      })
      .then(async () => {
        console.log("Added new item to shopping cart");
        return await instance.get("/buyer/cart");
      })
      .catch(() => {
        console.log("Unable to add new item to cart");
      });
    return response.data;
  }
);
export const updateShoppingCartItemQuantity = createAsyncThunk(
  "shoppingCart/updateItemQuantity",
  async (payload) => {
    let updateSuccessful = false;
    // Quantity change (but use points is the same)
    if (payload.oldQuantity !== payload.newQuantity) {
      console.log("Updating Quantity");
      const oldQuantity = {
        itemId: payload.id,
        quantity: parseInt(payload.oldQuantity),
        usePoints: payload.usePoints,
      };
      const newQuantity = {
        itemId: payload.id,
        quantity: parseInt(payload.newQuantity),
        usePoints: payload.usePoints,
      };
      console.log(oldQuantity);
      // console.log(newQuantity)
      // Update quantity
      await instance
        .delete("/buyer/cart", { data: oldQuantity })
        .then(async () => {
          await instance
            .post("/buyer/cart", newQuantity)
            .then(async () => {
              updateSuccessful = true;
            })
            .catch(() => {
              console.log("Unable to update items");
            });
        })
        .catch((e) => {
          console.log("Unable to delete old quantity", e);
        });
    } else {
      console.log("Updating use points");
      const oldQuantity = {
        itemId: payload.id,
        quantity: parseInt(payload.oldQuantity),
        usePoints: payload.usePoints,
      };
      const newQuantity = {
        itemId: payload.id,
        quantity: parseInt(payload.newQuantity),
        usePoints: !payload.usePoints,
      };
      console.log(oldQuantity);
      // console.log(newQuantity)
      // Update quantity
      await instance
        .delete("/buyer/cart", { data: oldQuantity })
        .then(async () => {
          await instance
            .post("/buyer/cart", newQuantity)
            .then(async () => {
              updateSuccessful = true;
            })
            .catch(() => {
              console.log("Unable to update items");
            });
        })
        .catch((e) => {
          console.log("Unable to delete old quantity", e);
        });
    }

    let response;
    if (updateSuccessful) {
      console.log("Successfully updated");
      response = await instance.get("/buyer/cart");
    }
    console.log("Response:", response);
    return response.data;
  }
);

export const fetchShoppingCartItems = createAsyncThunk(
  "shoppingCart/fetchItems",
  async () => {
    const response = await instance.get("/buyer/cart");
    return response.data;
  }
);

export const removeShoppingCartItem = createAsyncThunk(
  "shoppingCart/removeItem",
  async (payload) => {
    const response = await instance
      .delete("/buyer/cart", { data: payload })
      .then(async () => {
        return await instance.get("/buyer/cart");
      });
    return response.data;
  }
);
