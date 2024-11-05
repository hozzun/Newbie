import ClubLogos from "../../util/ClubLogos";
import ClubFullName from "../../util/ClubFullName";

interface RecommendResultProps {
  club: string;
  name: string;
}

const RecommendResult = ({ club, name }: RecommendResultProps) => {
  const getFullName = (club: string) => {
    const foundClub = ClubFullName.find(item => item.club === club);
    return foundClub ? foundClub.full : club;
  };

  const fullClubName = getFullName(club);

  return (
    <div className="flex flex-col justify-center items-center font-kbogothicmedium">
      <label className={`m-10 text-2xl text-club-${club}`}>{fullClubName}</label>
      <img className="w-40 h-40 mb-10" src={ClubLogos[club]} alt={`${fullClubName} logo`} />
      <label>{name} 님께 추천하는 구단은</label>
      <label>{fullClubName} 입니다.</label>
    </div>
  );
};

export default RecommendResult;
