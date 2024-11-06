import { GameResultData } from "../../containers/home/GameResult";
import Game, { GameProps } from "./Game";
import GameScores from "./GameScores";

interface GameResultProps {
  game: GameProps;
  gameResult: GameResultData | null;
}

const GameResult = (props: GameResultProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Game {...props.game} isVisibleDay={true} />
      {props.gameResult && (
        <GameScores
          inningCount={props.gameResult.inningCount}
          teamScoreDetails={props.gameResult.teamScoreDetails}
        />
      )}
    </div>
  );
};

export default GameResult;
