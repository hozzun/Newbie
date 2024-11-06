import { GAME_RESULT_DETAILS, GameResultDetailsData } from "../../containers/home/GameResult";

interface GameResultDetailsProps {
  gameResultDetails: GameResultDetailsData;
}

const GameResultDetails = (props: GameResultDetailsProps) => {
  return (
    <div className="mt-8 flex flex-col justify-center items-center w-full">
      <p className="text-xl font-kbogothicmedium text-green-900 mb-4">기록</p>
      {Object.entries(GAME_RESULT_DETAILS).map(
        ([gameResultDetailKey, gameResultDetailValue], index) => (
          <div className="flex flex-row justify-start w-full mb-2.5 items-center" key={index}>
            <p className="text-sm font-kbogothicmedium text-green-900 mr-2 min-w-[48px]">
              {gameResultDetailValue}
            </p>
            <p className="text-sm font-kbogothicmedium text-gray-700">
              {gameResultDetailKey in props.gameResultDetails
                ? props.gameResultDetails[gameResultDetailKey as keyof GameResultDetailsData]
                : "-"}
            </p>
          </div>
        ),
      )}
    </div>
  );
};

export default GameResultDetails;
