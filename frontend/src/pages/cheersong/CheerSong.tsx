import Container from "../../components/common/Container";
import CheerSongContainer from "../../containers/cheersong/CheerSong";
import BottomNavigation from "../../containers/common/BottomNavigation";

const CheerSong = () => {
  return (
    <>
      <Container>
        <CheerSongContainer />
      </Container>
      <BottomNavigation />
    </>
  );
};

export default CheerSong;
