import { useState, useEffect, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axiosInstance from "../../util/axiosInstance";
import ChatMessages from "../../components/baseballdict/ChatMessages";
import ChatInput from "../../components/baseballdict/ChatInput";
import AIBOT from "../../assets/images/aibot.png";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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

  const userProfileImage = useSelector((state: RootState) => state.myInfo.profileImage);

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
        setMessages(prevMessages => [...prevMessages, newMessage]);

        stompClient.publish({
          destination: `/app/chatbot/${roomId}`,
          body: JSON.stringify(newMessage),
        });

        setComment("");
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again.");

        setMessages(prevMessages => prevMessages.slice(0, -1)); // 에러발생시 마지막메세지제거
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
            userImage={userProfileImage}
            aiImage={AIBOT}
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
