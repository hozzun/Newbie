import { SCORE_INITIAL, TeamScoreDetail } from "../../containers/home/GameResult";
import clubs from "./clubs";

interface GameScoreItemProps {
  teamScoreDetail: TeamScoreDetail;
}

const GameScoreItem = (props: GameScoreItemProps) => {
  return (
    <div className="flex flex-row w-full h-4 my-1.5 items-center justify-between">
      <p className="text-sm font-kbogothicmedium text-gray-700 min-w-[100px] text-center">
        {clubs[props.teamScoreDetail.id].name}
      </p>
      {props.teamScoreDetail.scores.map((score, index) => (
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
          {props.teamScoreDetail[scoreInitialKey]}
        </p>
      ))}
    </div>
  );
};

export default GameScoreItem;
