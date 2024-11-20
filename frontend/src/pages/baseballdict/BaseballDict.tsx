import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import BaseballDictContainer from "../../containers/baseballdict/BaseballDict";

const BaseballDict = () => {
  return (
    <>
      <SectionBox label="야구사전" />
      <Container>
        <BaseballDictContainer />
      </Container>
    </>
  );
};

export default BaseballDict;
