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
    setUserInfo: (state, action: PayloadAction<{ email: string; platform: string }>) => {
      state.email = action.payload.email;
      state.platform = action.payload.platform;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    clearUserInfo: () => {
      return initialState;
    },
  },
});

export const { setUserInfo, setAuthenticated, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
