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
