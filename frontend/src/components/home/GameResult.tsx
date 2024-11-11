import { GameResultData } from "../../containers/home/GameResult";
import { GameProps } from "../../containers/home/Home";
import Game from "./Game";
import GameResultDetails from "./GameResultDetails";
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
        <>
          <GameScores
            inningCount={props.gameResult.inningCount}
            teamScoreDetails={props.gameResult.teamScoreDetails}
          />
          <GameResultDetails gameResultDetails={props.gameResult.gameResultDetails} />
        </>
      )}
    </div>
  );
};

export default GameResult;
