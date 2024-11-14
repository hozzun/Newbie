import { useEffect, useState } from "react";
import PlayerComponent from "../../components/player/Player";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer } from "../../redux/playerSlice";
import { RootState } from "../../redux/store";
import CustomError from "../../util/CustomError";
import axios from "axios";
import { getHitterRecord, getPitcherRecord, getPlayerHightlights } from "../../api/playerApi";
import { PlayerRecordItemProps } from "../../components/player/PlayerRecordItem";

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

export interface Video {
  url: string;
  title: string;
}

const Player = () => {
  const dispatch = useDispatch();

  const playerInfo = useSelector((state: RootState) => state.player.player);

  const [playerSeasonRecordItem, setPlayerSeasonRecordItem] =
    useState<Array<PlayerRecordItemProps> | null>(null);
  const [playerHighlights, setPlayerHighlights] = useState<Array<Video> | null>(null);

  const fetchPlayerRecord = async () => {
    try {
      if (!playerInfo) {
        throw new CustomError("[ERROR] 선수 정보 없음 by player");
      }

      if (playerInfo.position === "투수") {
        const response = await getPitcherRecord({ id: playerInfo.id });
        const playerRecordData: Array<PitcherRecord> = response.data.map(d => {
          return {
            year: parseInt(d.year),
            earnedRunAverage: d.era,
            game: d.gameCount,
            win: d.win,
            lose: d.lose,
            save: d.save,
            hold: d.hld,
            winningPercentage: d.wpct,
            inningsPitched: d.ip,
            hitsAllowed: d.h,
            homeRunsAllowed: d.hr,
            baseOnBalls: d.bb,
            hitByPitch: d.hbp,
            strikeOuts: d.so,
            runs: d.r,
            earnedRun: d.er,
            walksPlusHitsPerInningPitched: d.whip,
          };
        });

        playerRecordData.sort((a, b) => a.year - b.year);

        const lastIndex = playerRecordData.length - 1;
        const playerRecordItemData: Array<PlayerRecordItemProps> = Object.entries(
          playerRecordData[lastIndex],
        )
          .filter(([key]) => key !== "year")
          .map(([key, value]) => {
            const label = pitcherSeasonRecord[key];

            return {
              label,
              value,
            };
          });

        setPlayerSeasonRecordItem(playerRecordItemData);
      } else {
        const response = await getHitterRecord({ id: playerInfo.id });
        const playerRecordData: Array<HitterRecord> = response.data.map(d => {
          return {
            year: parseInt(d.year),
            battingAverage: d.avg,
            game: d.gameCount,
            plateAppearance: d.pa,
            atBat: d.ab,
            runs: d.r,
            hits: d.h,
            double: d.two,
            triple: d.three,
            homeRun: d.homerun,
            totalBases: d.tb,
            runsBattedIn: d.rbi,
            sacrificeHit: d.sac,
            sacrificeFly: d.sf,
          };
        });

        playerRecordData.sort((a, b) => a.year - b.year);

        const lastIndex = playerRecordData.length - 1;
        const playerRecordItemData: Array<PlayerRecordItemProps> = Object.entries(
          playerRecordData[lastIndex],
        )
          .filter(([key]) => key !== "year")
          .map(([key, value]) => {
            const label = hitterSeasonRecord[key];

            return {
              label,
              value,
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
    fetchPlayerRecord();
    fetchPlayerHighlights();

    return () => {
      dispatch(setPlayer(null));
    };
  }, []);

  return (
    <PlayerComponent
      playerInfo={playerInfo}
      playerSeasonRecordItem={playerSeasonRecordItem}
      playerHighlights={playerHighlights}
    />
  );
};

export default Player;
