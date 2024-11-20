import AngleSmallUp from "../../assets/icons/angle-small-up.svg?react";
import AngleSmallDown from "../../assets/icons/angle-small-down.svg?react";
import clubs from "./clubs";
import { ClubRankItemProps } from "../../containers/home/Home";

interface RankDifferenceProps {
  rankDifference: number;
}

const RankDifference = (props: RankDifferenceProps) => {
  return (
    <div className="flex flex-row items-center justify-center min-w-[50px]">
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
    <div
      className="flex flex-row w-full h-8 px-2 py-7 rounded-lg bg-gray-100 items-center justify-between hover:cursor-pointer hover:bg-gray-200/50"
      onClick={props.goDetail}
    >
      <p className="text-base font-kbogothicbold text-gray-700 min-w-[20px] text-center">
        {props.rank}
      </p>
      <p className="text-base font-kbogothicbold text-gray-700 min-w-[100px] text-center">
        {clubs[props.id].name}
      </p>
      <p className="text-base font-kbogothiclight text-gray-700 min-w-[30px] text-center">
        {props.gameCount}
      </p>
      <p className="text-base font-kbogothiclight text-gray-700 min-w-[80px] text-center">
        {props.winCount}-{props.drawCount}-{props.loseCount}
      </p>
      <p className="text-base font-kbogothiclight text-gray-700 min-w-[20px] text-center">
        {props.gameDifference}
      </p>
      <RankDifference rankDifference={props.rankDifference} />
    </div>
  );
};

export default ClubRankItem;
