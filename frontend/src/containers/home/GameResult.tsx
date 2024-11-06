import { useEffect, useState } from "react";
import GameResultComponent from "../../components/home/GameResult";

export enum SCORE_INITIAL {
  run = "R",
  hit = "H",
  error = "E",
  baseOnBalls = "B",
}

export enum GAME_RESULT_DETAILS {
  winningHit = "결승타",
  homeRuns = "홈런",
  triples = "3루타",
  doubles = "2루타",
  errors = "실책",
  stolenBases = "도루",
  caughtStealing = "도루자",
  doublePlays = "병살타",
  wildPitches = "폭투",
  umpires = "심판",
}

export interface TeamScoreDetail {
  id: string;
  scores: Array<number>;
  run: number;
  hit: number;
  error: number;
  baseOnBalls: number;
  [key: string]: number | string | number[];
}

export interface GameResultDetailsData {
  winningHit: string | null;
  homeRuns: string | null;
  doubles: string | null;
  errors: string | null;
  stolenBases: string | null;
  caughtStealing: string | null;
  doublePlays: string | null;
  wildPitches: string | null;
  umpires: string | null;
}

export interface GameResultData {
  id: number;
  inningCount: number;
  teamScoreDetails: Array<TeamScoreDetail>;
  gameResultDetails: GameResultDetailsData;
}

const game = {
  gameInfo: {
    day: "2024-11-03",
    time: "17:00",
    place: "광주스타디움",
    clubs: [
      {
        id: "samsung",
      },
      {
        id: "kia",
      },
    ],
  },
  gameSituation: {
    isPlaying: false,
    scores: {
      samsung: 2,
      kia: 1,
    },
  },
};

const GameResult = () => {
  const [gameResult, setGameResult] = useState<GameResultData | null>(null);

  const fetchGameResult = async () => {
    try {
      // TODO: GET - 경기 결과 상세정보
      const gameResultData: GameResultData = {
        id: 1234, // 경기 ID
        inningCount: 9, // 이닝 횟수
        teamScoreDetails: [
          {
            id: "kt", // 구단 ID
            scores: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            run: 1, // 득점
            hit: 2, // 안타
            error: 3, // 실책
            baseOnBalls: 4, // 볼넷
          },
          {
            id: "samsung", // 구단 ID
            scores: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            run: 5, // 득점
            hit: 6, // 안타
            error: 7, // 실책
            baseOnBalls: 8, // 볼넷
          },
        ],
        gameResultDetails: {
          winningHit: "박병호(4회 1사 1, 3루서 우익수 희생플라이)",
          homeRuns: "전병우3호(7회2점 한재승) 이재현14호(8회2점 박주현)",
          doubles: "천재환(2회) 김형준(6회)",
          errors: "김태현(6회)",
          stolenBases: "도태훈(2회)",
          caughtStealing: "김지찬(1회)",
          doublePlays: "김지찬(1회)",
          wildPitches: "김지찬(1회)",
          umpires: "김지찬(1회)",
        },
      };

      setGameResult(gameResultData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGameResult();
  }, []);

  return <GameResultComponent game={game} gameResult={gameResult} />;
};

export default GameResult;
