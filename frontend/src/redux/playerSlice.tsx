import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerInfo } from "../containers/player/PlayerList";

interface PlayerState {
  player: PlayerInfo | null;
}

const initialState: PlayerState = {
  player: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<PlayerInfo>) => {
      state.player = action.payload;
    },
  },
});

export const { setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
