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
  const [isLoading, setIsLoading] = useState(true);

  const userProfileImage = useSelector((state: RootState) => state.myInfo.profileImage);

  const fetchRoomAndHistory = async () => {
    try {
      const { data: fetchedRoomId } = await axiosInstance.post("/api/v1/chatbot/create-room");
      setRoomId(fetchedRoomId);

      const { data: chatHistory } = await axiosInstance.get(`/api/v1/chatbot/history`);
      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching room and history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomAndHistory();
  }, []);

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

  // Separate useEffect for WebSocket connection
  useEffect(() => {
    // Only attempt to connect if we have a roomId and aren't already connected
    if (roomId && !isLoading && !connected) {
      console.log("Attempting to connect with roomId:", roomId);

      const socket = new WebSocket(`${import.meta.env.VITE_API_SOCKET_URL}/api-chatbot/chatbot/ws`);
      const client = Stomp.over(socket);

      // Configure STOMP client
      client.debug = () => {}; // Disable debug logs

      const headers = {
        // Add any necessary headers here
      };

      client.connect(
        headers,
        () => {
          console.log("Successfully connected to WebSocket");
          setConnected(true);

          client.subscribe(`/topic/chatbot/${roomId}`, message => {
            console.log("Received message:", message);
            handleWebSocketMessage(message.body);
          });
        },
        error => {
          console.error("STOMP connection error:", error);
          setConnected(false);
        },
      );

      setStompClient(client);

      return () => {
        if (client.connected) {
          client.disconnect(() => {
            console.log("WebSocket connection closed");
            setConnected(false);
          });
        }
        setStompClient(null);
      };
    }
  }, [roomId, isLoading, connected, handleWebSocketMessage]);

  const handleSendMessage = useCallback(() => {
    if (stompClient && connected && comment.trim() && roomId) {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export default BaseballDict;
