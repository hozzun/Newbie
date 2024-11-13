import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notiReducer from "./notiSlice";
import gameReducer from "./gameSlice";
import playerReducer from "./playerSlice";
import cardStoreReducer from "./cardStoreSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notiReducer,
    game: gameReducer,
    player: playerReducer,
    cardStore: cardStoreReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
