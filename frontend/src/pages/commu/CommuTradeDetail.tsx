import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import CommuTradeDetailContainer from "../../containers/commu/CommuTradeDetail";

const CommuFreeDetail = () => {
  return (
    <>
      <SectionBox />
      <Container>
        <CommuTradeDetailContainer />
      </Container>
    </>
  );
};

export default CommuFreeDetail;
