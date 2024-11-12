import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

export interface RegisterCheerClubRequest {
    teamId: number;
}

export const registerCheerClub = (request: RegisterCheerClubRequest) => axios.patch(`/users/${request.teamId}/favorite-team`);