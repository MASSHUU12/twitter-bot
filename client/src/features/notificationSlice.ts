import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    value: { message: "", type: "" },
  },
  reducers: {
    notification: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { notification } = notificationSlice.actions;

export default notificationSlice.reducer;
