import axiosInstance from "../util/axiosInstance"

const axios = axiosInstance;

// 선수 목록 조회
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

// 선수 성적 조회
export interface GetPlayerRecordRequest {
    id: number;
}

export interface GetPitcherRecordResponse {
    year: string;
    playerName: string;
    playerId: number;
    teamName: string;
    teamId: number;
    era: string;
    gameCount: number;
    win: number;
    lose: number;
    save: number;
    hld: number;
    wpct: string;
    ip: string;
    h: number;
    hr: number;
    bb: number;
    hbp: number;
    so: number;
    r: number;
    er: number;
    whip: string;
}

export interface GetHitterRecordResponse {
    year: string;
    playerName: string;
    playerId: number;
    teamName: string;
    teamId: number;
    avg: string;
    gameCount: number;
    pa: number;
    ab: number;
    r: number;
    h: number;
    two: number;
    three: number;
    homerun: number;
    tb: number;
    rbi: number;
    sac: number;
    sf: number;
}

export const getPitcherRecord = (request: GetPlayerRecordRequest) => axios.get<GetPitcherRecordResponse>(`/api-baseball/stats/pitchers/${request.id}`);

export const getHitterRecord = (request: GetPlayerRecordRequest) => axios.get<GetHitterRecordResponse>(`/api-baseball/stats/hitters/${request.id}`);