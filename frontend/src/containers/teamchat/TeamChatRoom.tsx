import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ChatMessage {
  id?: string;
  sender: string;
  message: string;
  roomId: string;
  timestamp: string;
  type: "CHAT" | "JOIN" | "LEAVE";
  profileImageUrl?: string;
}

const TeamChatRoom: React.FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const [stompClient, setStompClient] = useState<StompJs.Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [comment, setComment] = useState("");
  const [connected, setConnected] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);

  // Redux state
  const userProfileImage = useSelector((state: RootState) => state.myInfo.profileImage);
  const nickname = useSelector((state: RootState) => state.myInfo.nickname) || "Anonymous";

  useEffect(() => {
    // Create STOMP client
    const client = new StompJs.Client({
      brokerURL: `${import.meta.env.VITE_API_SOCKET_URL}/ws/chat`,
      onConnect: () => {
        setConnected(true);
        console.log("WebSocket Connected");

        // Subscribe to chat room messages
        client.subscribe(`/topic/chatroom/${roomId}`, message => {
          const receivedMessage: ChatMessage = JSON.parse(message.body);
          setMessages(prevMessages => [...prevMessages, receivedMessage]);
        });

        // Subscribe to participant count updates
        client.subscribe(`/topic/chatroom/${roomId}/participants`, message => {
          setParticipantCount(parseInt(message.body, 10));
        });

        // Send join message
        const joinMessage: ChatMessage = {
          sender: nickname,
          type: "JOIN",
          roomId: roomId || "",
          message: `${nickname}님이 입장하셨습니다.`,
          timestamp: new Date().toISOString(),
          profileImageUrl: userProfileImage,
        };

        client.publish({
          destination: `/app/chat/${roomId}/join`,
          body: JSON.stringify(joinMessage),
        });
      },

      onWebSocketError: error => {
        console.error("WebSocket Error:", error);
        setConnected(false);
      },

      onStompError: frame => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
        setConnected(false);
      },
    });

    // Activate the client
    client.activate();
    setStompClient(client);

    // Cleanup on component unmount
    return () => {
      if (client && connected) {
        // Send leave message
        const leaveMessage: ChatMessage = {
          sender: nickname,
          type: "LEAVE",
          roomId: roomId || "",
          message: `${nickname}님이 퇴장하셨습니다.`,
          timestamp: new Date().toISOString(),
        };

        client.publish({
          destination: `/app/chat/${roomId}/leave`,
          body: JSON.stringify(leaveMessage),
        });

        // Deactivate client
        client.deactivate();
      }
    };
  }, [roomId, nickname, userProfileImage]);

  const handleSendMessage = () => {
    if (!stompClient || !connected || !comment.trim()) return;

    const chatMessage: ChatMessage = {
      sender: nickname,
      message: comment,
      roomId: roomId || "",
      type: "CHAT",
      timestamp: new Date().toISOString(),
      profileImageUrl: userProfileImage,
    };

    stompClient.publish({
      destination: `/app/chat/${roomId}/sendMessage`,
      body: JSON.stringify(chatMessage),
    });

    setComment("");
  };

  return (
    <div className="team-chat-container">
      <div className="chat-header">
        <h2>Team Chat Room</h2>
        <p>Participants: {participantCount}</p>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <img
              src={msg.profileImageUrl || "/default-avatar.png"}
              alt={msg.sender}
              className="user-avatar"
            />
            <div className="message-content">
              <strong>{msg.sender}</strong>
              <p>{msg.message}</p>
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={e => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default TeamChatRoom;
