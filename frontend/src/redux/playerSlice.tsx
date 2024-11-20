import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerInfo } from "../containers/player/PlayerList";

interface PlayerListItem {
  position: string;
  sort: string;
}

interface PlayerState {
  player: PlayerInfo | null;
  playerListItem: PlayerListItem;
}

const initialState: PlayerState = {
  player: null,
  playerListItem: {
    position: "투수",
    sort: "",
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<PlayerInfo | null>) => {
      state.player = action.payload;
    },
    setPlayerListItem: (state, action: PayloadAction<PlayerListItem>) => {
      state.playerListItem = action.payload;
    },
    clearPlayerListItem: state => {
      state.playerListItem = {
        position: "투수",
        sort: "",
      };
    },
  },
});

export const { setPlayer, setPlayerListItem, clearPlayerListItem } = playerSlice.actions;
export default playerSlice.reducer;
