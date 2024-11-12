import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import CommuFreeCreateContainer from "../../containers/commu/CommuFreeCreate";

const CommuFreeCreate = () => {
  return (
    <>
      <SectionBox label="작성하기" />
      <Container>
        <CommuFreeCreateContainer />
      </Container>
    </>
  );
};

export default CommuFreeCreate;
