import Container from "../../components/common/Container";
import SectionBox from "../../components/common/SectionBox";
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
