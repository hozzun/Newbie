import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "../containers/home/Home";
import { getKoreanDate } from "../util/getKoreanDate";

interface GameState {
  currentDate: string;
  game: GameProps | null;
}

const initialState: GameState = {
  currentDate: getKoreanDate(new Date()),
  game: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementDate: state => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() + 1);
      state.currentDate = getKoreanDate(newDate);
    },
    decrementDate: state => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() - 1);
      state.currentDate = getKoreanDate(newDate);
    },
    setGame: (state, action: PayloadAction<GameProps>) => {
      state.game = action.payload;
    },
  },
});

export const { incrementDate, decrementDate, setGame } = gameSlice.actions;
export default gameSlice.reducer;
