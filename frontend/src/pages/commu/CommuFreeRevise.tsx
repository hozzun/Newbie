import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import CommuTradeCreateContainer from "../../containers/commu/CommuTradeCreate";

const CommuTradeCreate = () => {
  return (
    <>
      <SectionBox label="수정하기" />
      <Container>
        <CommuTradeCreateContainer />
      </Container>
    </>
  );
};

export default CommuTradeCreate;
