import SectionBox from "../../containers/common/SectionBox";
import WatchGameContainers from "../../containers/mypage/WatchGame";
import Container from "../../components/common/Container";

const WatchGame = () => {
  return (
    <>
      <SectionBox label="나의 직관 경기" />
      <Container>
        <WatchGameContainers />
      </Container>
    </>
  );
};

export default WatchGame;
