import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

// 총 자산 마일리지 조회
export const getTotalMileage = () => axios.get<number>("/api/v1/cardstore/cards/mileage");

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

export const getLatestMyPhotoCard = () => axios.get<GetLatestMyPhotoCardResponse>("/api/v1/cardstore/cards/mycard")

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

export const getPhotoCards = (request: GetPhotoCardsRequest) =>
  axios.get<Array<GetPhotoCardsResponse>>("/api/v1/cardstore/cards/team", {
    params: {
      team: request.team,
      position: request.position,
      sortType: request.sortType,
      includeCard: request.includeCard
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

export const getTopSellingCards = () => axios.get<Array<GetTopSellingCardsResponse>>("/api/v1/cardstore/cards/top-sales");

// 카드 구매
export interface GetBuyPhotoCardRequest {
  cardId: string;
}

export const getBuyPhotoCard = (request: GetBuyPhotoCardRequest) => axios.post("api/v1/cardstore/purchase", null, {
  params: {
    cardId: request.cardId
  }
})
