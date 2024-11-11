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
    <div className="font-kbogothicmedium">
      <div className="flex flex-row justify-between items-center m-3 px-28">
        <div className="flex felx-row">
          <ClubSelectItem
            clubColor={props.team1} 
            logo={ClubLogos[props.team1]} 
            isSelected={false}
            width="w-16 h-16"
          />
          <label className="m-3">{FullName(props.team1)}</label>
        </div>
        <label className="m-3">{props.score1}</label>
      </div>
      <div className="flex flex-row justify-between items-center m-3 px-28">
        <div className="flex flex-row">
          <ClubSelectItem
            clubColor={props.team2} 
            logo={ClubLogos[props.team2]}
            isSelected={false}
            width="w-16 h-16"
          />
          <label className="m-3">{FullName(props.team2)}</label>
        </div>
        <label className="m-3">{props.score2}</label>
      </div>
    </div>
  );
};

export default GameResult;
