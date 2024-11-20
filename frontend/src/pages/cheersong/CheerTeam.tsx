import Container from "../../components/common/Container";
import CheerTeamContainer from "../../containers/cheersong/CheerTeam";
import SectionBox from "../../containers/common/SectionBox";

const CheerLyris = () => {
  return (
    <>
      <SectionBox label="응원가" />
      <Container>
        <CheerTeamContainer />
      </Container>
    </>
  );
};

export default CheerLyris;
