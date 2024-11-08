import Container from "../../components/common/Container";
import CardDetailComponent from "../../components/cardStore/CardDetail";
import SectionBox from "../../containers/common/SectionBox";

const CardDetail = () => {
  return (
    <>
      <SectionBox />
      <Container>
        <CardDetailComponent />
      </Container>
    </>
  );
};

export default CardDetail;
