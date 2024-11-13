import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import CommuFreeDetailContainer from "../../containers/commu/CommuFreeDetail";

const CommuFreeDetail = () => {
  return (
    <>
      <SectionBox />
      <Container>
        <CommuFreeDetailContainer />
      </Container>
    </>
  );
};

export default CommuFreeDetail;
