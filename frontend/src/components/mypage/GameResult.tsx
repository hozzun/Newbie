import ClubSelectItem from "../common/ClubSelectItem";
import ClubLogos from "../../util/ClubLogos";
import ClubFullName from "../../util/ClubFullName";

interface GameResultProps {
  team1: 
  | "doosan"
  | "hanwha"
  | "kia"
  | "kiwoom"
  | "kt"
  | "lg"
  | "lotte"
  | "nc"
  | "samsung"
  | "ssg";
  team2: 
  | "doosan"
  | "hanwha"
  | "kia"
  | "kiwoom"
  | "kt"
  | "lg"
  | "lotte"
  | "nc"
  | "samsung"
  | "ssg";
  score1: number;
  score2: number;
}

const FullName = (team: string) => {
  if (team) {
    return ClubFullName[team]
  }
};

const GameResult = (props: GameResultProps) => {
  return (
    <div className="font-kbogothicmedium w-full flex justify-center items-center">
      <div className="flex flex-col">
        <div className="flex flex-row m-3 justify-between">
          <div className="flex flex-row">
            <ClubSelectItem
              clubColor={props.team1}
              logo={ClubLogos[props.team1]}
              isSelected={false}
              width="w-16 h-16"
            />
            <label className="m-3 mr-24">{FullName(props.team1)}</label>
          </div>
          <label className="m-3">{props.score1}</label>
        </div>
        <div className="flex flex-row m-3 justify-between">
          <div className="flex flex-row">
            <ClubSelectItem
              clubColor={props.team2}
              logo={ClubLogos[props.team2]}
              isSelected={false}
              width="w-16 h-16"
            />
            <label className="m-3 mr-24">{FullName(props.team2)}</label>
          </div>
          <label className="m-3">{props.score2}</label>
        </div>
      </div>
    </div>
  );
};



export default GameResult;
