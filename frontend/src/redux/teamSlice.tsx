import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 초기 상태
interface TeamState {
  cheeringClub: number | null;
}

const initialState: TeamState = {
  cheeringClub: null,
};

// teamSlice 생성
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setCheeringClub: (state, action: PayloadAction<number>) => {
      state.cheeringClub = action.payload;
    },
  },
});

export const { setCheeringClub } = teamSlice.actions;
export default teamSlice.reducer;
