import { useState, useEffect, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axiosInstance from "../../util/axiosInstance";
import ChatMessages from "../../components/baseballdict/ChatMessages";
import ChatInput from "../../components/baseballdict/ChatInput";

interface Message {
  userId: number;
  message: string;
  roomId: string | null;
  timestamp: number;
}

const BaseballDict = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [comment, setComment] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = 1;

  const fetchRoomAndHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: fetchedRoomId } = await axiosInstance.post("/api-chatbot/create-room", null, {
        params: { userId },
      });

      setRoomId(fetchedRoomId);

      const { data: chatHistory } = await axiosInstance.get(
        `/api-chatbot/chatbot/${userId}/history`,
      );
      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching room or chat history:", error);
      setError("Failed to load chat room. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRoomAndHistory();
  }, [fetchRoomAndHistory]);

  // WebSocket 메시지 핸들러를 컴포넌트 외부로 분리
  const handleWebSocketMessage = useCallback(
    (messageBody: string) => {
      try {
        const receivedMessage = JSON.parse(messageBody);
        if (receivedMessage.content) {
          const formattedMessage = {
            userId: receivedMessage.userId || 0,
            message: receivedMessage.content,
            roomId,
            timestamp: Date.now(),
          };

          // 상태 업데이트를 함수형으로 변경하여 최신 상태 보장
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
      const client = new Client({
        webSocketFactory: () => new SockJS(`${axiosInstance.defaults.baseURL}/api-chatbot/ws`),
        onConnect: () => {
          setConnected(true);
          setError(null);

          client.subscribe(`/topic/chatbot/${roomId}`, message => {
            handleWebSocketMessage(message.body);
          });
        },
        onDisconnect: () => {
          setConnected(false);
          console.log("Disconnected from WebSocket");
        },
        onStompError: frame => {
          console.error("STOMP error:", frame);
          setError("Connection error. Please refresh the page.");
        },
        reconnectDelay: 5000,
      });

      client.activate();
      setStompClient(client);

      return () => {
        client.deactivate();
      };
    }
  }, [roomId, handleWebSocketMessage]);

  const handleSendMessage = useCallback(() => {
    if (stompClient && connected && comment.trim()) {
      const newMessage = {
        userId,
        message: comment.trim(),
        roomId,
        timestamp: Date.now(),
      };

      try {
        // 먼저 UI를 업데이트
        setMessages(prevMessages => [...prevMessages, newMessage]);

        // 그 다음 메시지 전송
        stompClient.publish({
          destination: `/app/chatbot/${roomId}`,
          body: JSON.stringify(newMessage),
        });

        setComment("");
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again.");
        // 에러 발생 시 마지막 메시지 제거
        setMessages(prevMessages => prevMessages.slice(0, -1));
      }
    }
  }, [stompClient, connected, comment, roomId, userId]);

  return (
    <>
      {isLoading && <div className="flex justify-center items-center h-full">Loading...</div>}
      {error && <div className="flex justify-center items-center h-full text-red-500">{error}</div>}
      {!isLoading && !error && (
        <>
          <ChatMessages
            messages={messages}
            currentUserId={userId}
            userImage="/path/to/user-image.png"
            aiImage="/path/to/ai-image.png"
          />
          <ChatInput
            onSendMessage={handleSendMessage}
            comment={comment}
            setComment={setComment}
            placeholder="메시지를 입력하세요..."
            disabled={!connected}
          />
        </>
      )}
    </>
  );
};

export default BaseballDict;
