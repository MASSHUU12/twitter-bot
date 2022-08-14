import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    value: false,
    index: 0,
    text: "",
  },
  reducers: {
    editOn: (
      state: { value: boolean; index: number; text: string },
      action: { payload: { index: number; text: string } }
    ) => {
      state.value = true;
      state.index = action.payload.index;
      state.text = action.payload.text;
    },
    editOff: (state: { value: boolean; index: number }) => {
      state.value = false;
      state.index = 0;
    },
  },
});

export const { editOn, editOff } = editSlice.actions;

export default editSlice.reducer;
