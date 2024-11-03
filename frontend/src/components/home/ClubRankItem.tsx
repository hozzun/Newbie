import { clubs } from "./TodayGame";
import AngleSmallUp from "../../assets/icons/angle-small-up.svg?react";
import AngleSmallDown from "../../assets/icons/angle-small-down.svg?react";

export interface ClubRankItemProps {
  id: string;
  rank: number;
  gameCount: number;
  winCount: number;
  drawCount: number;
  loseCount: number;
  gameDifference: number;
  rankDifference: number;
}

interface RankDifferenceProps {
  rankDifference: number;
}

const RankDifference = (props: RankDifferenceProps) => {
  return (
    <div className="flex flex-row items-center justify-center min-w-[50px] mr-2">
      {props.rankDifference !== 0 ? (
        props.rankDifference > 0 ? (
          <>
            <AngleSmallUp className="w-8 h-8 text-error-400" />
            <p className="text-[10px] text-error-400 font-kbogothiclight">
              {Math.abs(props.rankDifference)}
            </p>
          </>
        ) : (
          <>
            <AngleSmallDown className="w-8 h-8 text-success-400" />
            <p className="text-[10px] text-success-400 font-kbogothiclight">
              {Math.abs(props.rankDifference)}
            </p>
          </>
        )
      ) : null}
    </div>
  );
};

const ClubRankItem = (props: ClubRankItemProps) => {
  return (
    <div className="flex flex-row w-full h-8 py-7 rounded-lg bg-gray-100 items-center justify-between">
      <p className="text-base font-kbogothicbold text-gray-700 min-w-[50px] text-center">
        {props.rank}
      </p>
      <p className="text-base font-kbogothicbold text-gray-700 min-w-[150px] text-center">
        {clubs[props.id].name}
      </p>
      <p className="text-base font-kbogothiclight text-gray-700 min-w-[50px] text-center">
        {props.gameCount}
      </p>
      <p className="text-base font-kbogothiclight text-gray-700 min-w-[100px] text-center">
        {props.winCount}-{props.drawCount}-{props.loseCount}
      </p>
      <p className="text-base font-kbogothiclight text-gray-700 min-w-[50px] text-center">
        {props.gameDifference}
      </p>
      <RankDifference rankDifference={props.rankDifference} />
    </div>
  );
};

export default ClubRankItem;
