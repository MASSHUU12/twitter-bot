import { configureStore } from "@reduxjs/toolkit";
import editReducer from "../features/editSlice";

const store = configureStore({
  reducer: {
    edit: editReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
