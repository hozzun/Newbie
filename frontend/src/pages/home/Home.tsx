import AppBar from "../../components/common/AppBar";
import Container from "../../components/common/Container";
import HomeContainer from "../../containers/home/Home";
import BottomNavigation from "../../components/common/BottomNavigation";
import BaseballDictionaryFAB from "../../containers/home/BaseballDictionaryFAB";

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
