import { Video } from "../containers/player/Player";
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
    imageUrl: string;
}

export const getPlayers = (request: GetPlayersRequest) => axios.get<{content: Array<GetPlayersResponse>}>(`/api-baseball/players/team/${request.teamId}`, {
    params: {
        position: request.position,
        sortBy: request.sortBy,
        page: request.page,
        size: 30
    }
})

// 선수 정보 조회
export interface GetPlayerRequest {
    playerId: number;
}

export const getPlayer = (request: GetPlayerRequest) => axios.get<GetPlayersResponse>(`/api-baseball/players/player/${request.playerId}`);

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

export const getPitcherRecord = (request: GetPlayerRecordRequest) => axios.get<Array<GetPitcherRecordResponse>>(`/api-baseball/stats/pitchers/${request.id}`);

export const getHitterRecord = (request: GetPlayerRecordRequest) => axios.get<Array<GetHitterRecordResponse>>(`/api-baseball/stats/hitters/${request.id}`);

// 선수 하이라이트 영상 조회
export interface GetPlayerHighlightsRequest {
    name: string;
}

export const getPlayerHightlights = (request: GetPlayerHighlightsRequest) => axios.get<Array<Video>>("/api-baseball/highlights/player", {
    params: {
        playerName: request.name
    }
})

// 선수 좋아요 여부 조회
// TODO: 유저 ID 삭제
export interface GetPlayerLikedStatusRequest {
    playerId: number;
}

export interface GetPlayerLikedStatusResponse {
    playerId: number;
    isLiked: boolean;
}

export const getPlayerLikedStatus = (request: GetPlayerLikedStatusRequest) => axios.get<GetPlayerLikedStatusResponse>(`/api-baseball/players/like/1/${request.playerId}`);