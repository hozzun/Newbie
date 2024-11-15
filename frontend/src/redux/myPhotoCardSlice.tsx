import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MyPhotoCardState {
  team: number; // 응원하는 팀
  selectedPosition: string; // 선택된 포지션
}

const initialState: MyPhotoCardState = {
  team: 0, // 기본값은 0으로 설정 (추후 변경될 예정)
  selectedPosition: "투수", // 초기 포지션
};

const myPhotoCardSlice = createSlice({
  name: "myPhotoCard",
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<number>) => {
      state.team = action.payload;
    },
    setSelectedPosition: (state, action: PayloadAction<string>) => {
      state.selectedPosition = action.payload;
    },
  },
});

export const { setTeam, setSelectedPosition } = myPhotoCardSlice.actions;
export default myPhotoCardSlice.reducer;
