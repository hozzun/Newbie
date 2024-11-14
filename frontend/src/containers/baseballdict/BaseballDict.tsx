import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import { fetchRoomAndHistory, initializeWebSocket, sendMessage } from "../../api/baseballdictApi";
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
  const userId = 5;

  const fetchRoomAndChatHistory = useCallback(() => {
    fetchRoomAndHistory(userId, setRoomId, setMessages, setError, setIsLoading);
  }, [userId]);

  useEffect(() => {
    fetchRoomAndChatHistory();
  }, [fetchRoomAndChatHistory]);

  useEffect(() => {
    if (roomId) {
      const client = initializeWebSocket(roomId, setConnected, setError, setMessages);
      setStompClient(client);

      return () => {
        client.deactivate();
      };
    }
  }, [roomId]);

  useEffect(() => {
    // messages 배열이 업데이트될 때마다 콘솔에 출력
    console.log("Updated chat messages:", messages);
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (stompClient && connected && comment.trim()) {
      sendMessage(stompClient, userId, roomId, comment, setMessages, setError);
      setComment("");
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
