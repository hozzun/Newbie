import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardStoreListItem {
  club: string;
  position: string;
  sort: string;
  isVisibleBoughtCard: boolean;
}

interface CardStoreState {
  cardStoreListItem: CardStoreListItem;
}

const initialState: CardStoreState = {
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
    setCardStoreClubItem: (state, action: PayloadAction<string>) => {
      state.cardStoreListItem.club = action.payload;
    },
    setCardStoreListItem: (state, action: PayloadAction<CardStoreListItem>) => {
      state.cardStoreListItem = action.payload;
    },
  },
});

export const { setCardStoreListItem } = cardStoreSlice.actions;
export default cardStoreSlice.reducer;
