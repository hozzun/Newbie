import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import TeamChatRoomContainer from "../../containers/teamchat/TeamChatRoom";
import { useParams } from "react-router-dom";
import { useState } from "react";

const TeamChatRoom = () => {
  const { id } = useParams<{ id: string }>();
  const [participantCount, setParticipantCount] = useState(0);

  return (
    <>
      <SectionBox label={`${participantCount}명과 함께하는 ${id} 응원방`} />
      <Container>
        <TeamChatRoomContainer setParticipantCount={setParticipantCount} />
      </Container>
    </>
  );
};

export default TeamChatRoom;
