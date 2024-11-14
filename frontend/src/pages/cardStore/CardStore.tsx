import CardStoreContainer from "../../containers/cardstore/CardStore";
import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";

const CardStore = () => {
  return (
    <>
      <SectionBox label="스토어" />
      <Container>
        <CardStoreContainer />
      </Container>
    </>
  );
};

export default CardStore;
