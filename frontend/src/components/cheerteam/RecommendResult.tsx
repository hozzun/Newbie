import ClubLogos from "../../util/ClubLogos";
import ClubFullName from "../../util/ClubFullName";

interface RecommendResultProps {
  club:
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
  name: string;
}

const RecommendResult = ({ club, name }: RecommendResultProps) => {

  return (
    <div className="flex flex-col justify-center items-center font-kbogothicmedium">
      <label className={`m-10 text-2xl`}>{ClubFullName[club]}</label>
      <img className="w-40 h-40 mb-10" src={ClubLogos[club]} alt={`${ClubFullName[club]} logo`} />
      <label className="mb-5">{name} 님께 추천하는 구단은</label>
      <div>
        <label className="text-green-900">{ClubFullName[club]} </label>
        <label className="mb-10">입니다.</label>
      </div>
    </div>
  );
};

export default RecommendResult;
