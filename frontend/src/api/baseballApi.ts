import axiosInstance from "../util/axiosInstance";

const axios = axiosInstance;

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

export const getGames = (request: GetGamesRequest) => axios.get<Array<GetGamesResponse>>("/api-baseball/games", {
    params: {...request}
})

// 구단 순위 조회
export interface GetClubRanksRequest {
    year: string;
    teamId?: number; 
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

export const getClubRanks = (request: GetClubRanksRequest) => axios.get<Array<GetClubRanksResponse>>("/api-baseball/ranks", {
    params: {...request}
})

// 경기 결과 조회
export interface GetGameResultRequest {
    id: number;
}

export interface TeamScoreDetailResponse {
    teamId: number;
    scores: Array<string>;
    run: string;
    hit: string;
    error: string;
    baseOnBalls: string;
}
  
  export interface GameResultDetailsResponse {
    winningHit: Array<string>;
    homeRuns: Array<string>;
    doubles: Array<string>;
    errors: Array<string>;
    stolenBases: Array<string>;
    caughtStealing: Array<string>;
    doublePlays: Array<string>;
    wildPitches: Array<string>;
    umpires: Array<string>;
}
  
  export interface GameResultResponse {
    id: number;
    inningCount: number;
    teamScoreDetails: Array<TeamScoreDetailResponse>;
    gameResultDetails: GameResultDetailsResponse;
}

export const getGameResult = (request: GetGameResultRequest) => axios.get<GameResultResponse>(`/api-baseball/records/${request.id}`);