import SectionBox from "../../components/common/SectionBox";
import Container from "../../components/common/Container";
import BaseballDictContainer from "../../containers/baseballdict/BaseballDict";
import TextChatContainer from "../../containers/common/TextChatContainer";

const BaseballDict = () => {
  return (
    <>
      <SectionBox label="야구사전" />
      <Container>
        <BaseballDictContainer />
      </Container>

      <TextChatContainer />
    </>
  );
};

export default BaseballDict;
