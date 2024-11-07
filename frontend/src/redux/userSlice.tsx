import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  platform: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: "",
  platform: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{ email: string; platform: string; isAuthenticated: boolean }>,
    ) => {
      state.email = action.payload.email;
      state.platform = action.payload.platform;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearUserInfo: () => {
      return initialState;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
