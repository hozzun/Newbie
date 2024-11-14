import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

// 카드 목록 조회
export interface GetPhotoCardsRequest {
  team: number;
  position: string;
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

// TODO: 사용자 ID 삭제
export const getPhotoCards = (request: GetPhotoCardsRequest) =>
  axios.get<Array<GetPhotoCardsResponse>>("/api-cardstore/cards/team", {
    params: {
      team: request.team,
      position: request.position,
      sortType: request.sortType,
      includeCard: request.includeCard,
      userId: 5,
    },
  });
