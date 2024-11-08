import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import PlayerListComponent from "../../components/player/PlayerList";

const PlayerList = () => {
  return (
    <>
      <SectionBox label="선수단" />
      <Container>
        <PlayerListComponent />
      </Container>
    </>
  );
};

export default PlayerList;
