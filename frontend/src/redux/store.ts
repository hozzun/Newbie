import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notiReducer from "./notiSlice";
import gameReducer from "./gameSlice";
import playerReducer from "./playerSlice";
import cardStoreReducer from "./cardStoreSlice";
import teamReducer from './teamSlice';
import MyPhotoCardSliceReducer from './myPhotoCardSlice';
import myInfoSlice, { fetchMyInfo } from './myInfoSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notiReducer,
    game: gameReducer,
    player: playerReducer,
    cardStore: cardStoreReducer,
    team: teamReducer,
    myPhotoCard: MyPhotoCardSliceReducer,
    myInfo: myInfoSlice
  },
});

store.dispatch(fetchMyInfo()) // 앱 실행 시 나의 정보 저장
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
