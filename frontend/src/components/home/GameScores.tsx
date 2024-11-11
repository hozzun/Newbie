import { ClubScoreDetail, SCORE_INITIAL } from "../../containers/home/GameResult";
import GameScoreItem from "./GameScoreItem";

interface GameScoresProps {
  inningCount: number;
  clubScoreDetails: Array<ClubScoreDetail>;
}

const GameScores = (props: GameScoresProps) => {
  return (
    <div className="flex flex-col w-full mt-5 items-center justify-center">
      <div className="flex flex-row w-full h-4 my-1.5 items-center justify-between">
        <p className="text-sm font-kbogothicbold text-gray-500 min-w-[100px] text-center">팀명</p>
        {Array.from({ length: props.inningCount }, (_, i) => (
          <p key={i} className="text-sm font-kbogothicbold text-gray-700 min-w-[20px] text-center">
            {i + 1}
          </p>
        ))}
        {Object.values(SCORE_INITIAL).map((scoreInitial, index) => (
          <p
            key={index}
            className="text-sm font-kbogothicbold text-gray-700 min-w-[20px] text-center"
          >
            {scoreInitial}
          </p>
        ))}
      </div>
      {props.clubScoreDetails.map((t, index) => (
        <GameScoreItem key={index} inningCount={props.inningCount} clubScoreDetail={t} />
      ))}
    </div>
  );
};

export default GameScores;
