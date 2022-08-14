import { createSlice } from "@reduxjs/toolkit";

export const recordsSlice = createSlice({
  name: "records",
  initialState: {
    value: { data: [{ data: [""], count: 0 }] },
  },
  reducers: {
    editRecords: (
      state: {
        value: {
          data: {
            data: string[];
            count: number;
          }[];
        };
      },
      action: any
    ) => {
      state.value = action.payload;
    },
  },
});

export const { editRecords } = recordsSlice.actions;

export default recordsSlice.reducer;
