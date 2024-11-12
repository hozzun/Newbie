import axiosInstance from "../util/axiosInstance"

const axios = axiosInstance;

export interface GetPlayersRequest {
    teamId: number;
    position?: string;
    sortBy?: string;
    page: number;
}

export interface GetPlayersResponse {
    id: number;
    backNumber: string;
    name: string;
    teamId: number;
    teamName: string;
    position: string;
    birth: string;
    physical: string;
    academic: string;
    likeCount: number;
}

export const getPlayers = (request: GetPlayersRequest) => axios.get<{content: Array<GetPlayersResponse>}>(`/api-baseball/players/team/${request.teamId}`, {
    params: {
        position: request.position,
        sortBy: request.sortBy,
        page: request.page,
        size: 30
    }
})