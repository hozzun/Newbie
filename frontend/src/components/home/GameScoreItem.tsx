import { ClubScoreDetail, SCORE_INITIAL } from "../../containers/home/GameResult";
import clubs from "./clubs";

interface GameScoreItemProps {
  inningCount: number;
  clubScoreDetail: ClubScoreDetail;
}

const GameScoreItem = (props: GameScoreItemProps) => {
  return (
    <div className="flex flex-row w-full h-4 my-1.5 items-center justify-between">
      <p className="text-sm font-kbogothicmedium text-gray-700 min-w-[100px] text-center">
        {clubs[props.clubScoreDetail.id].name}
      </p>
      {props.clubScoreDetail.scores.slice(0, props.inningCount).map((score, index) => (
        <p
          key={index}
          className="text-sm font-kbogothicmedium text-gray-700 min-w-[20px] text-center"
        >
          {score}
        </p>
      ))}
      {Object.keys(SCORE_INITIAL).map((scoreInitialKey, index) => (
        <p
          key={index}
          className="text-sm font-kbogothicmedium text-gray-700 min-w-[20px] text-center"
        >
          {props.clubScoreDetail[scoreInitialKey]}
        </p>
      ))}
    </div>
  );
};

export default GameScoreItem;
