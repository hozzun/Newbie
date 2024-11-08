import CardStoreComponent from "../../components/cardStore/CardStore";
import Container from "../../components/common/Container";
import BottomNavigation from "../../containers/common/BottomNavigation";

const CardStore = () => {
  return (
    <>
      <Container>
        <CardStoreComponent />
      </Container>
      <BottomNavigation />
    </>
  );
};

export default CardStore;
