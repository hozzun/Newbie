import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

// 카드 목록 조회
export interface GetPhotoCardsRequest {
  team: number;
  sortType: string;
  includeCard: boolean;
}

export interface GetPhotoCardsResponse {
  id: string;
  name: string;
  no: string;
  team: number;
  price: number;
  imageUrl: string;
  position: string;
  createAt: string;
}

export const getPhotoCards = (request: GetPhotoCardsRequest) =>
  axios.get<Array<GetPhotoCardsResponse>>("/api-cardstore/cards/team", {
    params: {
      team: request.team,
      sortType: request.sortType,
      includeCard: request.includeCard,
      userId: 5,
    },
  });
