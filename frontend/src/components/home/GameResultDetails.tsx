import { GameResultDetailsData } from "../../containers/home/GameResult";

interface GameResultDetailsProps {
  gameResultDetails: GameResultDetailsData;
}

const GameResultDetails = (props: GameResultDetailsProps) => {
  return (
    <div className="mtflex flex-col justify-center items-center w-full">
      <p className="text-2xl font-kbogothicbold text-gray-700">오늘의 경기</p>
    </div>
  );
};

export default GameResultDetails;
