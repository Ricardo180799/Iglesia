import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./TokenSlice";
import temaSlice from "./TemaSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    tema:temaSlice
  },
});