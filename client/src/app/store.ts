import { configureStore } from "@reduxjs/toolkit";
import recordsReducer from "../features/recordsSlice";
import notificationReducer from "../features/notificationSlice";

const store = configureStore({
  reducer: {
    records: recordsReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
