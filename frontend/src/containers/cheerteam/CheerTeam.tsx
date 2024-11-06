import CheerTeamComponents from "../../components/cheerteam/CheerTeam";
import ClubSelectItemComponents from "../../components/cheerteam/ClubSelectItem";

const CheerTeam = () => {
  // TODO: 응원 팀 선정 후 저장 로직 -> ClubId 넘겨서 보내기

  return (
    <>
      <CheerTeamComponents />
      <ClubSelectItemComponents />
    </>
  );
};

export default CheerTeam;
