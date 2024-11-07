import CardStoreComponent from "../../components/cardStore/CardStore";
import BottomNavigation from "../../components/common/BottomNavigation";
import Container from "../../components/common/Container";

const CardStore = () => {
  return (
    <>
      <Container>
        <CardStoreComponent />
      </Container>
      <BottomNavigation onButtonClick={() => console.log("click")} />
    </>
  );
};

export default CardStore;
