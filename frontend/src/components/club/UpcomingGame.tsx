import { UpcomingGameData } from "../../containers/club/ClubHome";
import ClubLogos from "../../util/ClubLogos";

export interface UpcomingGameProps {
  upcomingGameData: UpcomingGameData | null;
}

const NoUpcomingGame = () => {
  return (
    <div className="mt-3 flex flex-col justify-center items-center w-full rounded-lg shadow-md bg-white aspect-[2.5/1]">
      예정된 경기가 없습니다...😥
    </div>
  );
};

const YesUpcomingGame = (props: UpcomingGameData) => {
  return (
    <div className="mt-3 flex flex-col justify-center items-center w-full rounded-lg shadow-md bg-white py-6">
      <p className="text-xl font-kbogothicbold text-gray-700">{props.stadium}</p>
      <p className="text-sm font-kbogothicmedium text-gray-700 mt-2">{props.day}</p>
      <img src={ClubLogos[props.teamId]} alt="kt logo" className="w-20 h-20 mt-6" />
    </div>
  );
};

const UpcomingGame = (props: UpcomingGameProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">예정된 경기</p>
      </div>
      {props.upcomingGameData ? (
        <YesUpcomingGame {...props.upcomingGameData} />
      ) : (
        <NoUpcomingGame />
      )}
    </div>
  );
};

export default UpcomingGame;
