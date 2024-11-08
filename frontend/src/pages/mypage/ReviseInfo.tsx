import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import ReviseInfoContainer from "../../containers/mypage/ReviseInfo";

const ReviseInfo = () => {
  return (
    <>
      <SectionBox label="마이페이지" />
      <Container>
        <ReviseInfoContainer />
      </Container>
    </>
  );
};

export default ReviseInfo;
