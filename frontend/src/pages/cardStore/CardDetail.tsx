import Container from "../../components/common/Container";
import SectionBox from "../../components/common/SectionBox";
import CardDetailComponent from "../../components/cardStore/CardDetail";

const CardDetail = () => {
  return (
    <>
      <SectionBox label="스토어" />
      <Container>
        <CardDetailComponent />
      </Container>
    </>
  );
};

export default CardDetail;
