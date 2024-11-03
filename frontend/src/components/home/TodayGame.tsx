import TextButton from "../common/TextButton";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";
import ClubLogos from "../../util/ClubLogos";

interface Club {
  id: string;
  imgSrc: string;
  name: string;
}

interface ClubProps {
  id: string;
  player: string;
}

export interface Game {
  time: string;
  place: string;
  clubs: Array<ClubProps>;
}

export interface GameSituation {
  isPlaying: boolean;
  scores?: Record<string, number>;
}

export interface GameAboutCheeringClub {
  game: Game;
  gameSituation: GameSituation;
}

export interface TodayGameProps {
  hasCheeringClub: boolean;
  todayGame?: GameAboutCheeringClub;
  goMore: () => void;
}

const clubs: Record<string, Club> = {
  kia: {
    id: "kia",
    name: "KIA 타이거즈",
    imgSrc: ClubLogos["kia"],
  },
  samsung: {
    id: "samsung",
    name: "삼성 라이온즈",
    imgSrc: ClubLogos["samsung"],
  },
  lg: {
    id: "lg",
    name: "LG 트윈스",
    imgSrc: ClubLogos["lg"],
  },
  doosan: {
    id: "doosan",
    name: "두산 베어스",
    imgSrc: ClubLogos["doosan"],
  },
  kt: {
    id: "kt",
    name: "KT 위즈",
    imgSrc: ClubLogos["kt"],
  },
  ssg: {
    id: "ssg",
    name: "SSG 랜더스",
    imgSrc: ClubLogos["ssg"],
  },
  lotte: {
    id: "lotte",
    name: "롯데 자이언츠",
    imgSrc: ClubLogos["ssg"],
  },
  hanhwa: {
    id: "hanhwa",
    name: "한화 이글스",
    imgSrc: ClubLogos["hanhwa"],
  },
  nc: {
    id: "nc",
    name: "NC 다이노스",
    imgSrc: ClubLogos["nc"],
  },
  kiwoom: {
    id: "kiwoom",
    name: "키움 히어로즈",
    imgSrc: ClubLogos["kiwoom"],
  },
};

const NoCheeringClub = () => {
  return (
    <>
      <p className="text-base font-kbogothiclight text-gray-700">
        응원할 구단이 등록되어 있지 않습니다.
      </p>
      <p className="text-base font-kbogothiclight text-gray-700 mt-1">
        응원할 구단을 등록하시면 경기 일정을 한 눈에 파악할 수 있습니다.
      </p>
      <Button className="mt-8" variant={BUTTON_VARIANTS.primary}>
        응원 구단 등록하기
      </Button>
    </>
  );
};

const Club = (props: ClubProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center bg-white rounded-lg p-3 shadow-md">
        <img src={clubs[props.id].imgSrc} alt={`${props.id} logo`} className="w-16 h-16" />
      </div>
      <p className="text-sm font-kbogothicmedium text-gray-700 mt-3">{clubs[props.id].name}</p>
      <p className="text-xs font-kbogothiclight text-gray-700 mt-1">{props.player}</p>
    </div>
  );
};

const GameAboutCheeringClub = (props: GameAboutCheeringClub) => {
  return (
    <>
      <p className="text-base font-kbogothicmedium text-gray-700">{props.game.time}</p>
      <p className="text-base font-kbogothicmedium text-gray-700">{props.game.place}</p>
      <div className="flex flex-row justify-between item-center w-[70%]">
        <Club id={props.game.clubs[0].id} player={props.game.clubs[0].player} />
        <div className="flex flex-col justify-center items-center">
          <p className="text-base font-kbogothicmedium text-gray-700">☀ 맑음</p>
          {props.gameSituation.isPlaying && props.gameSituation.scores ? (
            <p className="text-xl font-kbogothicbold text-gray-700 mt-1">
              {props.gameSituation.scores[props.game.clubs[0].id]}:
              {props.gameSituation.scores[props.game.clubs[1].id]}
            </p>
          ) : (
            <p className="text-base font-kbogothicmedium text-gray-700 mt-1">예정</p>
          )}
        </div>
        <Club id="kia" player="곽도규" />
      </div>
    </>
  );
};

const TodayGame = (props: TodayGameProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">오늘의 경기</p>
        <TextButton onClick={props.goMore}>더보기</TextButton>
      </div>
      <div className="mt-3 flex flex-col justify-center items-center w-full rounded-lg bg-gray-100 p-4 shadow-sm">
        {props.hasCheeringClub && props.todayGame?.game && props.todayGame?.gameSituation ? (
          <GameAboutCheeringClub
            game={props.todayGame.game}
            gameSituation={props.todayGame.gameSituation}
          />
        ) : (
          <NoCheeringClub />
        )}
      </div>
    </div>
  );
};

export default TodayGame;
