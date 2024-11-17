import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

// 최신 카드 조회
export interface GetLatestMyPhotoCardResponse {
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
export const getLatestMyPhotoCard = () => axios.get<GetLatestMyPhotoCardResponse>("/api-cardstore/cards/mycard", {
  params: {userId: 5}
})

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


// 카드 판매 TOP3 조회
export interface GetTopSellingCardsResponse {
  id: string;
  name: string;
  no: string;
  team: number;
  price: number;
  imageUrl: string;
  position: string;
  createAt: string;
}

export const getTopSellingCards = () => axios.get<Array<GetTopSellingCardsResponse>>("/api-cardstore/cards/top-sales");
