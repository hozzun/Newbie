import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notiReducer from "./notiSlice";
import gameReducer from "./gameSlice";
import playerReducer from "./playerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notiReducer,
    game: gameReducer,
    player: playerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
