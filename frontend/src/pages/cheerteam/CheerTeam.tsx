import SectionBox from "../../components/common/SectionBox";
import Container from "../../components/common/Container";
import CheerTeamContainers from "../../containers/cheerteam/CheerTeam";

const CheerTeam = () => {
  return (
    <>
      <SectionBox label="구단 선택" />
      <Container>
        <CheerTeamContainers />
      </Container>
    </>
  );
};

export default CheerTeam;
