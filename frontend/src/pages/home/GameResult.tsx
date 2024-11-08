import SectionBox from "../../containers/common/SectionBox";
import Container from "../../components/common/Container";
import GameResultContianer from "../../containers/home/GameResult";

const GameResult = () => {
  return (
    <>
      <SectionBox label="경기 결과" />
      <Container>
        <GameResultContianer />
      </Container>
    </>
  );
};

export default GameResult;
