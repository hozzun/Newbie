import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  introShown: false,
};

const introSlice = createSlice({
  name: "intro",
  initialState,
  reducers: {
    showIntro: state => {
      state.introShown = true;
    },
    resetIntro: state => {
      state.introShown = false;
    },
  },
});

export const { showIntro, resetIntro } = introSlice.actions;
export default introSlice.reducer;
