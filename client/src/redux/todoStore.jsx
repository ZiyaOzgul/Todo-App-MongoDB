import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice/todoSlicer";
export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
