import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

export interface getUserProfileResponse {
  email: string;
  nickname: string;
  address: string;
  profileImage: string;
  favoriteTeamId: number;
}

export const getUserProfile = () => {
  return axios.get<getUserProfileResponse[]>("/api-user/users/:id");
};

// 응원 구단 조회
export const getCheeringClub = () => axios.get<number>("/api-user/users/5/favorite-team");

// 최신 직관 경기 조회
export interface GetLatestAttendedGameResponse {
  id: string;
  userId: number;
  date: string;
  time: string;
  team1English: string;
  team2English: string;
  team1Korean: string;
  team2Korean: string;
  imageUrl: string;
  text: string;
}

export const getLatestAttendedGame = () => axios.get<GetLatestAttendedGameResponse>("/api-mypage/ticket/latest");
