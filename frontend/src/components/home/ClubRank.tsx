import { useState } from "react";
import ClubRankItem from "./ClubRankItem";
import CircleButton from "../common/CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "../common/variants";
import AngleSmallUp from "../../assets/icons/angle-small-up.svg?react";
import AngleSmallDown from "../../assets/icons/angle-small-down.svg?react";
import { ClubRankItemProps } from "../../containers/home/Home";

export interface ClubRankProps {
  clubRankItems: Array<ClubRankItemProps> | null;
}

const ClubRank = (props: ClubRankProps) => {
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const handleToggle = () => {
    if (!props.clubRankItems) {
      setVisibleCount(0);
    } else {
      if (visibleCount === 3) {
        setVisibleCount(props.clubRankItems.length);
      } else {
        setVisibleCount(3);
      }
    }
  };

  const circleButtonItem = {
    img: visibleCount > 3 ? AngleSmallUp : AngleSmallDown,
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">구단 랭킹</p>
        <div className="flex flex-row space-x-4">
          <p className="text-sm font-kbogothiclight text-gray-700">경기</p>
          <p className="text-sm font-kbogothiclight text-gray-700">승-무-패</p>
          <p className="text-sm font-kbogothiclight text-gray-700">경기차</p>
          <p className="text-sm font-kbogothiclight text-gray-700">순위변동</p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center space-y-2.5 mt-3">
        {props.clubRankItems &&
          props.clubRankItems
            .slice(0, visibleCount)
            .map((clubRankItem, index) => <ClubRankItem key={index} {...clubRankItem} />)}
      </div>
      <CircleButton
        className="w-10 h-10 mt-2"
        variant={CIRCLE_BUTTON_VARIANTS.grayLine}
        item={circleButtonItem}
        onClick={handleToggle}
      />
    </div>
  );
};

export default ClubRank;
