import { useNavigate } from "react-router-dom";
import SectionBox from "../../components/common/SectionBox";
import Container from "../../components/common/Container";
import CheerTeamContainers from "../../containers/cheerteam/CheerTeam";

const CheerTeam = () => {

  const nav = useNavigate()

  const handleNav =  () => {
    nav(-1)
  }

  return (
    <>
      <SectionBox label="구단 선택" onClick={handleNav} />
      <Container>
        <CheerTeamContainers />
      </Container>
    </>
  );
};

export default CheerTeam;
