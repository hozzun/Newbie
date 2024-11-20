import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import PlayerListContainer from "../../containers/player/PlayerList";

const PlayerList = () => {
  return (
    <>
      <SectionBox label="선수단" />
      <Container>
        <PlayerListContainer />
      </Container>
    </>
  );
};

export default PlayerList;
