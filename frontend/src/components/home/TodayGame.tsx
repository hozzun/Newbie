import TextButton from "../common/TextButton";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";
import Game, { GameProps } from "./Game";

export interface TodayGameProps {
  hasCheeringClub: boolean;
  todayGame?: GameProps;
  goMore: () => void;
}

const NoCheeringClub = () => {
  return (
    <div className="mt-3 flex flex-col justify-center items-center w-full rounded-lg bg-gray-100 p-4 shadow-sm">
      <p className="text-base font-kbogothiclight text-gray-700">
        응원할 구단이 등록되어 있지 않습니다.
      </p>
      <p className="text-base font-kbogothiclight text-gray-700 mt-1">
        응원할 구단을 등록하시면 경기 일정을 한 눈에 파악할 수 있습니다.
      </p>
      <Button className="mt-8" variant={BUTTON_VARIANTS.primary}>
        응원 구단 등록하기
      </Button>
    </div>
  );
};

const TodayGame = (props: TodayGameProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">오늘의 경기</p>
        <TextButton onClick={props.goMore}>더보기</TextButton>
      </div>
      {props.hasCheeringClub && props.todayGame?.gameInfo && props.todayGame?.gameSituation ? (
        <Game gameInfo={props.todayGame.gameInfo} gameSituation={props.todayGame.gameSituation} />
      ) : (
        <NoCheeringClub />
      )}
    </div>
  );
};

export default TodayGame;
