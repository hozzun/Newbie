// src/store/slices/NotiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 초기 상태 설정
interface NotiState {
  permission: "granted" | "denied" | "default";
}

const initialState: NotiState = {
  permission: (Notification.permission as NotiState["permission"]) || "default",
};

const notiSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setPermission: (state, action: PayloadAction<"granted" | "denied">) => {
      state.permission = action.payload;
    },
  },
});

export const { setPermission } = notiSlice.actions;
export default notiSlice.reducer;
