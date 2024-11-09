import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axiosInstance from "../../util/axiosInstance";
import TextChat from "../../components/common/TextChat";

interface Message {
  userId: number;
  message: string;
  roomId: string | null;
  timestamp: number;
}

const TextChatContainer = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [comment, setComment] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = 1;

  useEffect(() => {
    const fetchRoomAndHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data: fetchedRoomId } = await axiosInstance.post("/api-chatbot/create-room", null, {
          params: { userId },
        });

        setRoomId(fetchedRoomId);

        const { data: chatHistory } = await axiosInstance.get(
          `/api-chatbot/chat/${fetchedRoomId}/history`,
        );
        setMessages(chatHistory);
      } catch (error) {
        console.error("Error fetching room or chat history:", error);
        setError("Failed to load chat room. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomAndHistory();
  }, [userId]);

  useEffect(() => {
    if (roomId) {
      const client = new Client({
        webSocketFactory: () => new SockJS(`${axiosInstance.defaults.baseURL}/api-chatbot/ws`),
        onConnect: () => {
          setConnected(true);
          setError(null);
          console.log("Connected to WebSocket");

          client.subscribe(`/topic/chat/${roomId}`, message => {
            try {
              const receivedMessage = JSON.parse(message.body);
              setMessages(prevMessages => [...prevMessages, receivedMessage]);
            } catch (error) {
              console.error("Error parsing message:", error);
            }
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
        if (client) {
          client.deactivate();
        }
      };
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (stompClient && connected && comment.trim()) {
      const message = {
        userId,
        message: comment.trim(),
        roomId,
        timestamp: Date.now(),
      };

      try {
        stompClient.publish({
          destination: `/app/chat/${roomId}`,
          body: JSON.stringify(message),
        });

        setComment("");
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again.");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <TextChat
      label="Type your message..."
      onSendMessage={handleSendMessage}
      onKeyPress={handleKeyPress}
      comment={comment}
      setComment={setComment}
      messages={messages}
      currentUserId={userId}
      isLoading={isLoading}
      error={error}
      connected={connected}
    />
  );
};

export default TextChatContainer;
