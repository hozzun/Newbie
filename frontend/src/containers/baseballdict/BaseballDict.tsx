import { useState, useEffect, useCallback } from "react";
import Stomp from "stompjs";
import axiosInstance from "../../util/axiosInstance";
import ChatMessages from "../../components/baseballdict/ChatMessages";
import ChatInput from "../../components/baseballdict/ChatInput";
import AIBOT from "../../assets/images/aibot.png";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Message {
  message: string;
  roomId: string;
  timestamp: number;
}

const BaseballDict = () => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [comment, setComment] = useState("");
  const [roomId, setRoomId] = useState<string>("");

  const userProfileImage = useSelector((state: RootState) => state.myInfo.profileImage);

  useEffect(() => {
    fetchRoomAndHistory();
  }, []);

  const fetchRoomAndHistory = async () => {
    try {
      const { data: fetchedRoomId } = await axiosInstance.post("/api/v1/chatbot/create-room");

      setRoomId(fetchedRoomId);

      // 채팅 히스토리 가져오기
      const { data: chatHistory } = await axiosInstance.get(`/api/v1/chatbot/chatbot/history`);

      setMessages(chatHistory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWebSocketMessage = useCallback(
    (messageBody: string) => {
      try {
        const receivedMessage = JSON.parse(messageBody);
        if (receivedMessage.content) {
          const formattedMessage: Message = {
            message: receivedMessage.content,
            roomId,
            timestamp: Date.now(),
          };

          setMessages(prevMessages => [...prevMessages, formattedMessage]);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    },
    [roomId],
  );

  useEffect(() => {
    if (roomId) {
      const socket = new WebSocket(`${import.meta.env.VITE_API_SOCKET_URL}/api-chatbot/chatbot/ws`);
      const client = Stomp.over(socket);

      client.connect(
        () => {
          setConnected(true);

          client.subscribe(`/topic/chatbot/${roomId}`, message => {
            handleWebSocketMessage(message.body);
          });
        },
        error => {
          console.error("STOMP connection error:", error);
        },
      );

      setStompClient(client);

      return () => {
        client.disconnect(() => {
          console.log("WebSocket 연결이 끊어졌습니다.");
          setConnected(false);
        });
        setStompClient(null);
      };
    }
  }, [roomId, handleWebSocketMessage]);

  const handleSendMessage = useCallback(() => {
    if (stompClient && connected && comment.trim()) {
      const newMessage: Message = {
        message: comment.trim(),
        roomId,
        timestamp: Date.now(),
      };

      try {
        setMessages(prevMessages => [...prevMessages, newMessage]);

        stompClient.send(`/app/chatbot/${roomId}`, {}, JSON.stringify(newMessage));

        setComment("");
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prevMessages => prevMessages.slice(0, -1));
      }
    }
  }, [stompClient, connected, comment, roomId]);

  return (
    <>
      <div className="h-full">
        <ChatMessages messages={messages} userImage={userProfileImage} aiImage={AIBOT} />
        <ChatInput
          onSendMessage={handleSendMessage}
          comment={comment}
          setComment={setComment}
          placeholder="메시지를 입력하세요..."
          disabled={!connected}
        />
      </div>
    </>
  );
};

export default BaseballDict;
