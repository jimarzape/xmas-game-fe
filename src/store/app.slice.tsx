import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: null,
  reducers: {
    appError: (state: any, { payload }) => ({ ...state, error: payload }),
  },
  extraReducers: () => {},
});

export const { appError } = appSlice.actions;
export default appSlice.reducer;
