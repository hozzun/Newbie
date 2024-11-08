import { useNavigate } from "react-router-dom";

import Container from "../../components/common/Container";
import CheerSongContainer from "../../containers/cheersong/CheerSong";
import BottomNavigation from "../../components/common/BottomNavigation";

const CheerSong = () => {
  const navigate = useNavigate();

  const handleBottomNavigationClick = (index: number) => {
    const routes = ["/clubhome", "/cheersong", "/home", "/communication", "/mypage"];
    navigate(routes[index]);
  };

  return (
    <>
      <Container>
        <CheerSongContainer />
      </Container>
      <BottomNavigation onButtonClick={handleBottomNavigationClick} />
    </>
  );
};

export default CheerSong;
