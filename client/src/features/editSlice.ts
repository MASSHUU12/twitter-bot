import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state: { value: boolean }) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = editSlice.actions;

export default editSlice.reducer;
