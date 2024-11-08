import { useNavigate } from "react-router-dom";

import AppBar from "../../components/common/AppBar";
import Container from "../../components/common/Container";
import HomeContainer from "../../containers/home/Home";
import BottomNavigation from "../../components/common/BottomNavigation";
import BaseballDictionaryFAB from "../../containers/home/BaseballDictionaryFAB";

const Home = () => {
  const navigate = useNavigate();

  const handleBottomNavigationClick = (index: number) => {
    const routes = ["/clubhome", "/cheersong", "/home", "/communication", "/mypage"];
    navigate(routes[index]);
  };
  return (
    <>
      <AppBar />
      <Container>
        <HomeContainer />
      </Container>
      <BaseballDictionaryFAB />
      <BottomNavigation onButtonClick={handleBottomNavigationClick} />
    </>
  );
};

export default Home;
