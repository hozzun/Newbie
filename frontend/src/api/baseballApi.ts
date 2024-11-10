import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

const getGamesApiUrl = import.meta.env.VITE_WATCH_GAME;
const getClubRanksApiUrl = import.meta.env.VITE_GET_CLUB_RANKS;

// 경기 조회
export interface GetGamesRequest {
    year: string;
    month: string;
    day: string;
    teamId?: number;
}

export interface GetGamesResponse {
    id: number,
    date: string,
    time: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamId: number,
    awayTeamId: number,
    homeScore: number,
    awayScore: number,
    gameResult: string,
    stadium: string,
    season: string,
    awayStartingPitcher: string,
    homeStartingPitcher: string
}

export const getGames = (request: GetGamesRequest) => axios.get<GetGamesResponse>(getGamesApiUrl, {
    params: {...request}
})

// 구단 순위 조회
export interface GetClubRanksRequest {
    year: string;
}

export interface GetClubRanksResponse {
    id: number;
    year: string;
    rank: number;
    teamId: number;
    teanName: string;
    gameCount: number;
    winCount: number;
    loseCount: number;
    drawCount: number;
    winRate: string;
    gameDiff: string;
    recent10: string;
    streak: string;
    rankChange: number;
}

export const getClubRanks = (request: GetClubRanksRequest) => axios.get<Array<GetClubRanksResponse>>(getClubRanksApiUrl, {
    params: {...request}
})