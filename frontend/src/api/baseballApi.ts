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
    year?: string;
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

// 구단 성적 조회
export interface getClubRecordRequest {
    teamId: number;
}

export interface getClubPitcherRecordResponse {
    rank: number;
    year: string;
    teamId: number;
    teamName: string;
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
    so: number;
    r: number;
    er: number;
    whip: string;
}

export interface getClubHitterRecordResponse {
    rank: number;
    year: string;
    teamId: number;
    teamName: string;
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

export const getClubPitcherRecord = (request: getClubRecordRequest) => axios.get<Array<getClubPitcherRecordResponse>>(`/api-baseball/team/stats/pitcher/${request.teamId}`);

export const getClubHitterRecord = (request: getClubRecordRequest) => axios.get<Array<getClubHitterRecordResponse>>(`/api-baseball/team/stats/hitter/${request.teamId}`);

// 포토 카드 선수 정보 조회
export interface GetPhotoCardPlayerInfoRequest {
    teamId: number;
    backNumber: string;
}

export interface GetPhotoCardPlayerInfoResponse {
    position: string;
    birth: string;
    physical: string;
    academic: string;
}

export const getPhotoCardPlayerInfo = (request: GetPhotoCardPlayerInfoRequest) => axios.get<GetPhotoCardPlayerInfoResponse>(`/api-baseball/players/photos/${request.teamId}/${request.backNumber}`);