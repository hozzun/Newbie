import Container from "../../components/common/Container";
import CardDetailContainer from "../../containers/cardstore/CardDetail";
import SectionBox from "../../containers/common/SectionBox";

const CardDetail = () => {
  return (
    <>
      <SectionBox />
      <Container>
        <CardDetailContainer />
      </Container>
    </>
  );
};

export default CardDetail;
