import { useEffect, useState } from "react";
import PlayerComponent from "../../components/player/Player";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer } from "../../redux/playerSlice";
import { RootState } from "../../redux/store";
import CustomError from "../../util/CustomError";
import axios from "axios";
import {
  getHitterRecord,
  getPitcherRecord,
  getPlayer,
  getPlayerHightlights,
  getPlayerLikedStatus,
  updatePlayerLikedStatus,
} from "../../api/playerApi";
import { PlayerRecordItemProps } from "../../components/player/PlayerRecordItem";
import { useParams } from "react-router-dom";
import { PlayerInfo } from "./PlayerList";
import { getClubIdByNum } from "../../util/ClubId";

export interface PlayerRecordData {
  year: number;
  value: number;
}

export interface PitcherRecords {
  earnedRunAverage: Array<PlayerRecordData>;
  game: Array<PlayerRecordData>;
  win: Array<PlayerRecordData>;
  lose: Array<PlayerRecordData>;
  save: Array<PlayerRecordData>;
  hold: Array<PlayerRecordData>;
  winningPercentage: Array<PlayerRecordData>;
  inningsPitched: Array<PlayerRecordData>;
  hitsAllowed: Array<PlayerRecordData>;
  homeRunsAllowed: Array<PlayerRecordData>;
  baseOnBalls: Array<PlayerRecordData>;
  hitByPitch: Array<PlayerRecordData>;
  strikeOuts: Array<PlayerRecordData>;
  runs: Array<PlayerRecordData>;
  earnedRun: Array<PlayerRecordData>;
  walksPlusHitsPerInningPitched: Array<PlayerRecordData>;
  [key: string]: Array<PlayerRecordData>;
}

export interface HitterRecords {
  battingAverage: Array<PlayerRecordData>;
  game: Array<PlayerRecordData>;
  plateAppearance: Array<PlayerRecordData>;
  atBat: Array<PlayerRecordData>;
  runs: Array<PlayerRecordData>;
  hits: Array<PlayerRecordData>;
  double: Array<PlayerRecordData>;
  triple: Array<PlayerRecordData>;
  homeRun: Array<PlayerRecordData>;
  totalBases: Array<PlayerRecordData>;
  runsBattedIn: Array<PlayerRecordData>;
  sacrificeHit: Array<PlayerRecordData>;
  sacrificeFly: Array<PlayerRecordData>;
  [key: string]: Array<PlayerRecordData>;
}

export interface PitcherRecord {
  year: number;
  earnedRunAverage: string; // 평균자책점
  game: number; // 경기
  win: number; // 승리
  lose: number; // 패배
  save: number; // 세이브
  hold: number; // 홀드
  winningPercentage: string; // 승률
  inningsPitched: string; // 이닝
  hitsAllowed: number; // 피안타
  homeRunsAllowed: number; // 피홈런
  baseOnBalls: number; // 볼넷
  hitByPitch: number; // 사구
  strikeOuts: number; // 삼진
  runs: number; // 실점
  earnedRun: number; // 자책점
  walksPlusHitsPerInningPitched: string; // 이닝당 출루율
}

export interface HitterRecord {
  year: number;
  battingAverage: string; // 타율
  game: number; // 경기
  plateAppearance: number; // 타석
  atBat: number; // 타수
  runs: number; // 득점
  hits: number; // 안타
  double: number; // 2루타
  triple: number; // 3루타
  homeRun: number; // 홈런
  totalBases: number; // 총타
  runsBattedIn: number; // 타점
  sacrificeHit: number; // 희생번트
  sacrificeFly: number; // 희생플라이
}

const pitcherRecordKey: Record<string, string> = {
  era: "earnedRunAverage",
  gameCount: "game",
  win: "win",
  lose: "lose",
  save: "save",
  hld: "hold",
  wpct: "winningPercentage",
  ip: "inningsPitched",
  h: "hitsAllowed",
  hr: "homeRunsAllowed",
  bb: "baseOnBalls",
  hbp: "hitByPitch",
  so: "strikeOuts",
  r: "runs",
  er: "earnedRun",
  whip: "walksPlusHitsPerInningPitched",
};

const pitcherSeasonRecord: Record<string, string> = {
  earnedRunAverage: "평균자책점",
  game: "경기",
  win: "승리",
  lose: "패배",
  save: "세이브",
  hold: "홀드",
  winningPercentage: "승률",
  inningsPitched: "이닝",
  hitsAllowed: "피안타",
  homeRunsAllowed: "피홈런",
  baseOnBalls: "볼넷",
  hitByPitch: "사구",
  strikeOuts: "삼진",
  runs: "실점",
  earnedRun: "자책점",
  walksPlusHitsPerInningPitched: "이닝당 출루율",
};

const hitterRecordKey: Record<string, string> = {
  avg: "battingAverage",
  gameCount: "game",
  pa: "plateAppearance",
  ab: "atBat",
  r: "runs",
  h: "hits",
  two: "double",
  three: "triple",
  homerun: "homeRun",
  tb: "totalBases",
  rbi: "runsBattedIn",
  sac: "sacrificeHit",
  sf: "sacrificeFly",
};

const hitterSeasonRecord: Record<string, string> = {
  battingAverage: "타율",
  game: "경기",
  plateAppearance: "타석",
  atBat: "타수",
  runs: "득점",
  hits: "안타",
  double: "2루타",
  triple: "3루타",
  homeRun: "홈런",
  totalBases: "총타",
  runsBattedIn: "타점",
  sacrificeHit: "희생번트",
  sacrificeFly: "희생플라이",
};

export interface Video {
  url: string;
  title: string;
}

const Player = () => {
  const dispatch = useDispatch();

  const playerInfo = useSelector((state: RootState) => state.player.player);

  const { clubId, playerId } = useParams<{ clubId: string; playerId: string }>();

  const [isPlayerLiked, setIsPlayerLiked] = useState<boolean>(false);
  const [subPlayerInfo, setSubPlayerInfo] = useState<PlayerInfo | null>(null);
  const [playerRecord, setPlayerRecord] = useState<PitcherRecords | HitterRecords | null>(null);
  const [playerSeasonRecordItem, setPlayerSeasonRecordItem] =
    useState<Array<PlayerRecordItemProps> | null>(null);
  const [playerHighlights, setPlayerHighlights] = useState<Array<Video> | null>(null);

  const fetchPlayerLikeStatus = async () => {
    try {
      if (!playerId) {
        throw new CustomError("[ERROR] 선수 ID 없음 by player");
      }

      const response = await getPlayerLikedStatus({ playerId: parseInt(playerId) });
      const isPlayerLikedData = response.data.isLiked;

      setIsPlayerLiked(isPlayerLikedData);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 사용자 선수 좋아요 여부 정보 없음 by player");
      } else {
        console.error(e);
      }
    }
  };

  const fetchPlayerInfo = async () => {
    try {
      if (!playerId) {
        throw new CustomError("[ERROR] 선수 ID 없음 by player");
      }

      const response = await getPlayer({ playerId: parseInt(playerId) });
      const subPlayerInfoData: PlayerInfo = {
        id: response.data.id,
        teamId: getClubIdByNum(response.data.teamId),
        backNumber: response.data.backNumber,
        name: response.data.name,
        position: response.data.position,
        birth: response.data.birth,
        physical: response.data.physical,
        likeCount: response.data.likeCount,
        imageUrl: response.data.imageUrl,
      };

      setSubPlayerInfo(subPlayerInfoData);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 선수 정보 없음 by player");
      } else {
        console.error(e);
      }
    }
  };

  const fetchPlayerRecord = async () => {
    try {
      if (!playerInfo) {
        throw new CustomError("[ERROR] 선수 정보 없음 by player");
      }

      if (playerInfo.position === "투수") {
        const response = await getPitcherRecord({ id: playerInfo.id });

        const playerRecordDatas: PitcherRecords = {
          earnedRunAverage: [],
          game: [],
          win: [],
          lose: [],
          save: [],
          hold: [],
          winningPercentage: [],
          inningsPitched: [],
          hitsAllowed: [],
          homeRunsAllowed: [],
          baseOnBalls: [],
          hitByPitch: [],
          strikeOuts: [],
          runs: [],
          earnedRun: [],
          walksPlusHitsPerInningPitched: [],
        };

        const targetYear = new Date().getFullYear();
        response.data.forEach(d => {
          const year = parseInt(d.year);

          Object.entries(d).forEach(([key, value]) => {
            if (key === "year") {
              return;
            }

            const recordKey = pitcherRecordKey[key];
            if (!recordKey) {
              return;
            }

            if (playerRecordDatas[recordKey]) {
              playerRecordDatas[recordKey].push({ year, value: value === "-" ? 0 : value });
            } else {
              playerRecordDatas[recordKey] = [{ year, value: value === "-" ? 0 : value }];
            }
          });

          if (year === targetYear) {
            const playerRecordItemData: Array<PlayerRecordItemProps> = [];
            Object.entries(d).forEach(([key, value]) => {
              const recordKey = pitcherRecordKey[key];
              if (!recordKey) {
                return;
              }

              playerRecordItemData.push({
                key: recordKey,
                label: pitcherSeasonRecord[recordKey],
                value,
              });
            });

            setPlayerSeasonRecordItem(playerRecordItemData);
          }
        });

        setPlayerRecord(playerRecordDatas);
      } else {
        const response = await getHitterRecord({ id: playerInfo.id });

        const playerRecordDatas: HitterRecords = {
          battingAverage: [],
          game: [],
          plateAppearance: [],
          atBat: [],
          runs: [],
          hits: [],
          double: [],
          triple: [],
          homeRun: [],
          totalBases: [],
          runsBattedIn: [],
          sacrificeHit: [],
          sacrificeFly: [],
        };

        const targetYear = new Date().getFullYear();
        response.data.forEach(d => {
          const year = parseInt(d.year);

          Object.entries(d).forEach(([key, value]) => {
            if (key === "year") {
              return;
            }

            const recordKey = hitterRecordKey[key];
            if (!recordKey) {
              return;
            }

            if (playerRecordDatas[recordKey]) {
              playerRecordDatas[recordKey].push({ year, value: value === "-" ? 0 : value });
            } else {
              playerRecordDatas[recordKey] = [{ year, value: value === "-" ? 0 : value }];
            }
          });

          if (year === targetYear) {
            const playerRecordItemData: Array<PlayerRecordItemProps> = [];
            Object.entries(d).forEach(([key, value]) => {
              const recordKey = hitterRecordKey[key];
              if (!recordKey) {
                return;
              }

              playerRecordItemData.push({
                key: recordKey,
                label: hitterSeasonRecord[recordKey],
                value,
              });
            });

            setPlayerSeasonRecordItem(playerRecordItemData);
          }
        });

        setPlayerRecord(playerRecordDatas);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 선수 성적 없음 by player");
      } else {
        console.error(e);
      }
    }
  };

  const fetchPlayerHighlights = async () => {
    try {
      if (!playerInfo) {
        throw new CustomError("[ERROR] 선수 정보 없음 by player");
      }

      const response = await getPlayerHightlights({ name: playerInfo.name });
      const playerHighlightDatas: Array<Video> = response.data;

      setPlayerHighlights(playerHighlightDatas);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 선수 하이라이트 없음 by player");
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (!playerInfo) {
      fetchPlayerInfo();
    }
    fetchPlayerLikeStatus();
    fetchPlayerRecord();
    fetchPlayerHighlights();

    return () => {
      dispatch(setPlayer(null));
    };
  }, []);

  const handlePlayerLikedStatus = async () => {
    try {
      if (!playerId) {
        throw new CustomError("[ERROR] 선수 ID 없음 by player");
      }

      const response = await updatePlayerLikedStatus({ playerId: parseInt(playerId) });
      if (response.status === 200) {
        setIsPlayerLiked(!isPlayerLiked);
        // TODO: 선수 좋아요 변경 성공 stack bar로 보여주기
        alert(isPlayerLiked ? "선수 좋아요 취소 성공" : "선수 좋아요 성공");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PlayerComponent
      isPlayerLiked={isPlayerLiked}
      handlePlayerLikedStatus={handlePlayerLikedStatus}
      playerInfo={playerInfo ? playerInfo : subPlayerInfo}
      clubId={clubId ? clubId : null}
      playerRecord={playerRecord}
      playerSeasonRecordItem={playerSeasonRecordItem}
      playerHighlights={playerHighlights}
    />
  );
};

export default Player;
