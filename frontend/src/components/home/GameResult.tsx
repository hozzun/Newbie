import { GameResultData } from "../../containers/home/GameResult";
import { GameProps } from "../../containers/home/Home";
import Game from "./Game";
import GameResultDetails from "./GameResultDetails";
import GameScores from "./GameScores";

interface GameResultProps {
  game: GameProps | null;
  gameResult: GameResultData | null;
}

const GameResult = (props: GameResultProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {props.game ? (
        <Game {...props.game} isVisibleDay={true} />
      ) : (
        <p className="text-base font-kbogothicmedium text-gray-700">Loading...</p>
      )}
      {props.gameResult && (
        <>
          <GameScores
            inningCount={props.gameResult.inningCount}
            clubScoreDetails={props.gameResult.clubScoreDetails}
          />
          <GameResultDetails gameResultDetails={props.gameResult.gameResultDetails} />
        </>
      )}
    </div>
  );
};

export default GameResult;
