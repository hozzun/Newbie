import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PhotoCardInfo } from "../containers/cardstore/CardStore";

interface CardStoreListItem {
  club: string;
  position: string;
  sort: string;
  isVisibleBoughtCard: boolean;
}

interface CardStoreState {
  photoCardInfo: PhotoCardInfo | null;
  cardStoreListItem: CardStoreListItem;
}

const initialState: CardStoreState = {
  photoCardInfo: null,
  cardStoreListItem: {
    club: "",
    position: "투수",
    sort: "",
    isVisibleBoughtCard: true,
  },
};

const cardStoreSlice = createSlice({
  name: "cardstore",
  initialState,
  reducers: {
    setPhotoCardInfo: (state, action: PayloadAction<PhotoCardInfo | null>) => {
      state.photoCardInfo = action.payload;
    },
    setCardStoreClubItem: (state, action: PayloadAction<string>) => {
      state.cardStoreListItem.club = action.payload;
    },
    setCardStoreListItem: (state, action: PayloadAction<CardStoreListItem>) => {
      state.cardStoreListItem = action.payload;
    },
    clearCardStoreListItem: state => {
      state.cardStoreListItem = {
        club: "",
        position: "투수",
        sort: "",
        isVisibleBoughtCard: true,
      };
    },
  },
});

export const { setPhotoCardInfo, setCardStoreListItem, clearCardStoreListItem } =
  cardStoreSlice.actions;
export default cardStoreSlice.reducer;
