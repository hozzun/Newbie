import ClubSelectItem from "../common/ClubSelectItem";
import ClubLogos from "../../util/ClubLogos";

interface GameResultProps {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
}

const GameResult = (props: GameResultProps) => {
  return (
    <div className="font-kbogothicmedium">
      <div className="flex flex-row justify-center items-center m-3">
        <ClubSelectItem
          clubColor="samsung" 
          logo={ClubLogos.samsung} 
          isSelected={false}
        />
        <label className="m-3 mr-10">{props.team1}</label>
        <label className="m-3 ml-20">{props.score1}</label>
      </div>
      <div className="flex flex-row justify-center items-center m-3">
        <ClubSelectItem
          clubColor="ssg" 
          logo={ClubLogos.ssg}
          isSelected={false}
        />
        <label className="m-3 mr-10">{props.team2}</label>
        <label className="m-3 ml-20">{props.score2}</label>
      </div>
    </div>
  );
};

export default GameResult;
