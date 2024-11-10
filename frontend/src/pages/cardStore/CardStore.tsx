import CardStoreComponent from "../../components/cardStore/CardStore";
import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";

const CardStore = () => {
  return (
    <>
      <SectionBox label="스토어" />
      <Container>
        <CardStoreComponent />
      </Container>
    </>
  );
};

export default CardStore;
