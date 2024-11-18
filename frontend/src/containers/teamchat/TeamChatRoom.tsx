import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stomp from "stompjs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

import TeamChatInput from "../../components/teamchat/TeamChatInput";
import TeamChatMessages from "../../components/teamchat/TeamChatMessages";
import SectionBox from "../common/SectionBox";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  roomId: string;
  timestamp: string;
  type: "CHAT" | "JOIN" | "LEAVE";
  profileImageUrl?: string;
}

const TeamChatRoomContainer = () => {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [participantCount, setParticipantCount] = useState(0);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [comment, setComment] = useState("");
  const [connected, setConnected] = useState(false);

  const nickname = useSelector((state: RootState) => state.myInfo.nickname || "뉴비");
  const userProfileImage = useSelector(
    (state: RootState) => state.myInfo.profileImage || "/pwa-192x192.png",
  );

  useEffect(() => {
    if (!id) return;

    const socket = new WebSocket(`${import.meta.env.VITE_API_SOCKET_URL}/api-chat/chat/ws/chat`);
    const stomp = Stomp.over(socket);

    const authToken = window.localStorage.getItem("authorization");

    stomp.connect(
      { Authorization: authToken },
      () => {
        setConnected(true);
        console.log("WebSocket 연결 성공");

        const joinMessage = {
          sender: nickname,
          type: "JOIN",
          roomId: id,
          message: `${nickname}님이 입장하셨습니다.`,
          timestamp: new Date().toISOString(),
          profileImageUrl: "/path/to/profile.jpg",
        };

        stomp.send(`/app/chat/${id}/join`, {}, JSON.stringify(joinMessage));

        stomp.subscribe(`/topic/chatroom/${id}`, message => {
          const newMessage = JSON.parse(message.body);
          setMessages(prev => [...prev, newMessage]);
        });

        stomp.subscribe(`/topic/chatroom/${id}/participants`, message => {
          const count = parseInt(message.body, 10);
          setParticipantCount(count);
        });

        setStompClient(stomp);
      },
      error => {
        console.error("WebSocket 연결 실패", error);
        setConnected(false);
      },
    );
  }, [id, nickname]);

  const handleSendMessage = () => {
    if (!id || !stompClient || !comment.trim()) return;

    const chatMessage = {
      sender: nickname,
      message: comment,
      roomId: id,
      type: "CHAT" as const,
      timestamp: new Date().toISOString(),
      profileImageUrl: "/path/to/profile.jpg",
    };

    stompClient.send(`/app/chat/${id}/sendMessage`, {}, JSON.stringify(chatMessage));
    setComment("");
  };

  const handleLeave = () => {
    if (!id || !stompClient) {
      nav(-1);
      return;
    }

    const leaveMessage = {
      sender: nickname,
      type: "LEAVE" as const,
      roomId: id,
      message: `${nickname}님이 퇴장하셨습니다.`,
      timestamp: new Date().toISOString(),
      profileImageUrl: "/path/to/profile.jpg",
    };

    // LEAVE 메시지 전송
    stompClient.send(`/app/chat/${id}/leave`, {}, JSON.stringify(leaveMessage));

    // WebSocket 연결 종료
    stompClient.disconnect(() => {
      console.log("WebSocket 연결 종료");
      nav(-1);
      setConnected(false);
      setStompClient(null);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 font-kbogothicmedium">
        <SectionBox
          label={`${participantCount}명과 함께하는 ${id} 응원방`}
          onBackClick={handleLeave}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <TeamChatMessages
          messages={messages}
          currentNickname={nickname}
          userImage={userProfileImage}
        />
      </div>
      <TeamChatInput
        onSendMessage={handleSendMessage}
        comment={comment}
        setComment={setComment}
        placeholder="메시지를 입력하세요..."
        disabled={!connected}
      />
    </div>
  );
};

export default TeamChatRoomContainer;
