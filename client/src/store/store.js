import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "../reducers/shoppingCartSlice";

export default configureStore({
  reducer: { shoppingCart: shoppingCartReducer },
});
