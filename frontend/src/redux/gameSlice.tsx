import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameProps } from "../containers/home/Home";

interface GameState {
  currentDate: string;
  game: GameProps | null;
}

const initialState: GameState = {
  currentDate: new Date().toISOString(),
  game: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementDate: state => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() + 1);
      state.currentDate = newDate.toISOString();
    },
    decrementDate: state => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() - 1);
      state.currentDate = newDate.toISOString();
    },
    setGame: (state, action: PayloadAction<GameProps>) => {
      state.game = action.payload;
    },
  },
});

export const { incrementDate, decrementDate, setGame } = gameSlice.actions;
export default gameSlice.reducer;
