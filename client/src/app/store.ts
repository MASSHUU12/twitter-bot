import { configureStore } from "@reduxjs/toolkit";
import editReducer from "../features/editSlice";
import recordsReducer from "../features/recordsSlice";

const store = configureStore({
  reducer: {
    edit: editReducer,
    records: recordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
