import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import TeamChatContainer from "../../containers/teamchat/TeamChat";

const TeamChat = () => {
  return (
    <>
      <SectionBox label="팀 응원방" />
      <Container>
        <TeamChatContainer />
      </Container>
    </>
  );
};

export default TeamChat;
