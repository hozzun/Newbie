import Container from "../../components/common/Container";
import SectionBox from "../../components/common/SectionBox";
import GameScheduleContainer from "../../containers/home/GameSchedule";

const GameSchedule = () => {
  return (
    <>
      <SectionBox label="경기 일정" />
      <Container>
        <GameScheduleContainer />
      </Container>
    </>
  );
};

export default GameSchedule;
