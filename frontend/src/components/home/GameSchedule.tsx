import AngleLeft from "../../assets/icons/angle-left.svg?react";
import AngleRight from "../../assets/icons/angle-right.svg?react";
import Game from "../../containers/home/Game";
import CircleButton from "../common/CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "../common/variants";
import { GameProps } from "./Game";

interface GameScheduleProps {
  day: string;
  games: Array<GameProps> | null;
  goPreviousDay: () => void;
  goNextDay: () => void;
}

const GameSchedule = (props: GameScheduleProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <CircleButton
          className="w-8 h-8"
          variant={CIRCLE_BUTTON_VARIANTS.grayLine}
          item={{ img: AngleLeft }}
          onClick={props.goPreviousDay}
        />
        <p className="text-base font-kbogothicmedium text-gray-700">{props.day}</p>
        <CircleButton
          className="w-8 h-8"
          variant={CIRCLE_BUTTON_VARIANTS.grayLine}
          item={{ img: AngleRight }}
          onClick={props.goNextDay}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center spce-y-2.5 mt-5">
        {props.games && props.games.length > 0 ? (
          props.games.map((game, index) => <Game key={index} {...game} />)
        ) : (
          <p className="text-base font-kbogothiclight text-gray-500">
            해당 날짜에 경기 일정이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default GameSchedule;
