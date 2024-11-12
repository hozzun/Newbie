import { useEffect, useState } from "react";
import PlayerComponent from "../../components/player/Player";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer } from "../../redux/playerSlice";
import { RootState } from "../../redux/store";
import CustomError from "../../util/CustomError";
import axios from "axios";
import { getHitterRecord, getPitcherRecord } from "../../api/playerApi";
import { PlayerRecordItemProps } from "../../components/player/PlayerRecordItem";

export interface PitcherRecord {
  earnedRunAverage: number; // 평균자책점
  game: number; // 경기
  win: number; // 승리
  lose: number; // 패배
  save: number; // 세이브
  hold: number; // 홀드
  winningPercentage: number; // 승률
  inningsPitched: string; // 이닝
  hitsAllowed: number; // 피안타
  homeRunsAllowed: number; // 피홈런
  baseOnBalls: number; // 볼넷
  hitByPitch: number; // 사구
  strikeOuts: number; // 삼진
  runs: number; // 실점
  earnedRun: number; // 자책점
  walksPlusHitsPerInningPitched: number; // 이닝당 출루율
  [key: string]: number | string;
}

export interface HitterRecord {
  battingAverage: number; // 타율
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
  [key: string]: number;
}

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

const Player = () => {
  const dispatch = useDispatch();

  const playerInfo = useSelector((state: RootState) => state.player.player);

  const [playerSeasonRecordItem, setPlayerSeasonRecordItem] =
    useState<Array<PlayerRecordItemProps> | null>(null);

  const fetchPlayerRecord = async () => {
    try {
      if (!playerInfo) {
        throw new CustomError("[ERROR] 선수 정보 없음 by player");
      }

      if (playerInfo.position === "투수") {
        const response = await getPitcherRecord({ id: playerInfo.id });
        const playerRecordData: PitcherRecord = {
          earnedRunAverage: parseFloat(response.data.era),
          game: response.data.gameCount,
          win: response.data.win,
          lose: response.data.lose,
          save: response.data.save,
          hold: response.data.hld,
          winningPercentage: parseFloat(response.data.wpct),
          inningsPitched: response.data.ip,
          hitsAllowed: response.data.h,
          homeRunsAllowed: response.data.hr,
          baseOnBalls: response.data.bb,
          hitByPitch: response.data.hbp,
          strikeOuts: response.data.so,
          runs: response.data.r,
          earnedRun: response.data.er,
          walksPlusHitsPerInningPitched: parseFloat(response.data.whip),
        };

        const playerRecordItemData: Array<PlayerRecordItemProps> = Object.keys(
          playerRecordData,
        ).map(key => {
          const label = pitcherSeasonRecord[key];
          const value = playerRecordData[key];

          return {
            label,
            value: value,
          };
        });

        setPlayerSeasonRecordItem(playerRecordItemData);
      } else {
        const response = await getHitterRecord({ id: playerInfo.id });
        const playerRecordData: HitterRecord = {
          battingAverage: parseFloat(response.data.avg),
          game: response.data.gameCount,
          plateAppearance: response.data.pa,
          atBat: response.data.ab,
          runs: response.data.r,
          hits: response.data.h,
          double: response.data.two,
          triple: response.data.three,
          homeRun: response.data.homerun,
          totalBases: response.data.tb,
          runsBattedIn: response.data.rbi,
          sacrificeHit: response.data.sac,
          sacrificeFly: response.data.sf,
        };

        const playerRecordItemData: Array<PlayerRecordItemProps> = Object.keys(
          playerRecordData,
        ).map(key => {
          const label = hitterSeasonRecord[key];
          const value = playerRecordData[key];

          return {
            label,
            value: value,
          };
        });

        setPlayerSeasonRecordItem(playerRecordItemData);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 선수 성적 없음 by player");
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchPlayerRecord();

    return () => {
      dispatch(setPlayer(null));
    };
  }, []);

  return (
    <PlayerComponent playerInfo={playerInfo} playerSeasonRecordItem={playerSeasonRecordItem} />
  );
};

export default Player;
