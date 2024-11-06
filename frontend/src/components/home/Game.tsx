import clubs from "./clubs";

interface ClubProps {
  id: string;
  player?: string;
}

export interface GameInfo {
  day: string;
  time: string;
  place: string;
  clubs: Array<ClubProps>;
  weather?: string;
}

export interface GameSituation {
  isPlaying: boolean;
  scores?: Record<string, number>;
}

export interface GameProps {
  gameInfo: GameInfo;
  gameSituation: GameSituation;
  isVisibleDay?: boolean;
  goDetail?: () => void;
}

const Club = (props: ClubProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center bg-white rounded-lg p-3 shadow-md">
        <img src={clubs[props.id].imgSrc} alt={`${props.id} logo`} className="w-16 h-16" />
      </div>
      <p className="text-sm font-kbogothicmedium text-gray-700 mt-3">{clubs[props.id].name}</p>
      {props.player && (
        <p className="text-xs font-kbogothiclight text-gray-700 mt-1">{props.player}</p>
      )}
    </div>
  );
};

const Game = (props: GameProps) => {
  const boxClass = `mt-3 flex flex-col justify-center items-center w-full rounded-lg bg-gray-100 p-4 shadow-sm ${props.goDetail && "hover:cursor-pointer hover:bg-gray-200/50"}`;

  return (
    <div className={boxClass} onClick={props.goDetail}>
      {props.isVisibleDay && (
        <p className="text-base font-kbogothicmedium text-gray-700">{props.gameInfo.day}</p>
      )}
      <p className="text-base font-kbogothicmedium text-gray-700">{props.gameInfo.time}</p>
      <p className="text-base font-kbogothicmedium text-gray-700">{props.gameInfo.place}</p>
      <div className="flex flex-row justify-around item-center w-full">
        <Club id={props.gameInfo.clubs[0].id} player={props.gameInfo.clubs[0].player} />
        <div className="flex flex-col justify-center items-center">
          {props.gameInfo.weather && (
            <p className="text-base font-kbogothicmedium text-gray-700">{props.gameInfo.weather}</p>
          )}
          {props.gameSituation.scores ? (
            <p className="text-xl font-kbogothicbold text-gray-700 mt-1">
              {props.gameSituation.scores[props.gameInfo.clubs[0].id]}:
              {props.gameSituation.scores[props.gameInfo.clubs[1].id]}
            </p>
          ) : (
            <p className="text-base font-kbogothicmedium text-gray-700 mt-1">예정</p>
          )}
        </div>
        <Club id={props.gameInfo.clubs[1].id} player={props.gameInfo.clubs[1].player} />
      </div>
    </div>
  );
};

export default Game;
