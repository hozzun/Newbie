import Container from "../../components/common/Container";
import CheerLyrisContainer from "../../containers/cheersong/CheerLyris";
import SectionBox from "../../containers/common/SectionBox";

const CheerLyris = () => {
  return (
    <>
      <SectionBox label="응원가" />
      <Container>
        <CheerLyrisContainer />
      </Container>
    </>
  );
};

export default CheerLyris;
