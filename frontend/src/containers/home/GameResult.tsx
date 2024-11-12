import { useEffect, useState } from "react";
import GameResultComponent from "../../components/home/GameResult";
import { GetGameResultRequest, getGameResult } from "../../api/baseballApi";
import { useParams } from "react-router-dom";
import CustomError from "../../util/CustomError";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getClubIdByNum } from "../../util/ClubId";

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

export interface ClubScoreDetail {
  id: string;
  scores: Array<string>;
  run: number;
  hit: number;
  error: number;
  baseOnBalls: number;
  [key: string]: number | string | Array<string>;
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
  clubScoreDetails: Array<ClubScoreDetail>;
  gameResultDetails: GameResultDetailsData;
}

const translateGameResultDetail = (gameResultDetail: Array<string>): string => {
  if (gameResultDetail.length === 0) {
    return "-";
  }

  return gameResultDetail.join(" ");
};

const GameResult = () => {
  const game = useSelector((state: RootState) => state.game.game);

  const { id } = useParams<{ id: string }>();

  const [gameResult, setGameResult] = useState<GameResultData | null>(null);

  const fetchGameResult = async () => {
    try {
      // TODO: GET - 경기 결과 상세정보
      if (!id) {
        throw new CustomError("[ERROR] 경기 ID 없음 by game result");
      }

      const getGameResultRequest: GetGameResultRequest = {
        id: parseInt(id),
      };
      const response = await getGameResult(getGameResultRequest);
      const clubScoreDetailDatas: Array<ClubScoreDetail> = response.data.teamScoreDetails.map(
        teamScoreDetail => ({
          id: getClubIdByNum(teamScoreDetail.teamId),
          scores: teamScoreDetail.scores,
          run: parseInt(teamScoreDetail.run),
          hit: parseInt(teamScoreDetail.hit),
          error: parseInt(teamScoreDetail.error),
          baseOnBalls: parseInt(teamScoreDetail.baseOnBalls),
        }),
      );
      const gameResultData: GameResultData = {
        id: response.data.id,
        inningCount: response.data.inningCount,
        clubScoreDetails: clubScoreDetailDatas,
        gameResultDetails: {
          winningHit: translateGameResultDetail(response.data.gameResultDetails.winningHit),
          homeRuns: translateGameResultDetail(response.data.gameResultDetails.homeRuns),
          doubles: translateGameResultDetail(response.data.gameResultDetails.doubles),
          errors: translateGameResultDetail(response.data.gameResultDetails.errors),
          stolenBases: translateGameResultDetail(response.data.gameResultDetails.stolenBases),
          caughtStealing: translateGameResultDetail(response.data.gameResultDetails.caughtStealing),
          doublePlays: translateGameResultDetail(response.data.gameResultDetails.doublePlays),
          wildPitches: translateGameResultDetail(response.data.gameResultDetails.wildPitches),
          umpires: translateGameResultDetail(response.data.gameResultDetails.umpires),
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
