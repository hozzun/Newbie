import AppBar from "../../components/common/AppBar";
import Container from "../../components/common/Container";
import HomeContainer from "../../containers/home/Home";
import BottomNavigation from "../../components/common/BottomNavigation";

const Home = () => {
  return (
    <>
      <AppBar />
      <Container>
        <HomeContainer />
      </Container>
      <BottomNavigation />
    </>
  );
};

export default Home;
