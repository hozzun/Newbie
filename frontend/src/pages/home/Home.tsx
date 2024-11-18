import AppBar from "../../containers/teamchat/AppBar";
import Container from "../../components/common/Container";
import HomeContainer from "../../containers/home/Home";
import BaseballDictionaryFAB from "../../containers/home/BaseballDictionaryFAB";
import BottomNavigation from "../../containers/common/BottomNavigation";

const Home = () => {
  return (
    <>
      <AppBar />
      <Container>
        <HomeContainer />
      </Container>
      <BaseballDictionaryFAB />
      <BottomNavigation />
    </>
  );
};

export default Home;
