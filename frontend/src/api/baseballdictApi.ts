import axiosInstance from "../util/axiosInstance";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface Message {
  userId: number;
  message: string;
  roomId: string | null;
  timestamp: number;
  content?: string;
}

export const fetchRoomAndHistory = async (
  userId: number,
  setRoomId: (roomId: string) => void,
  setMessages: (messages: Message[]) => void,
  setError: (error: string | null) => void,
  setIsLoading: (isLoading: boolean) => void,
) => {
  try {
    setIsLoading(true);
    setError(null);

    const { data: fetchedRoomId } = await axiosInstance.post("/api-chatbot/create-room", null, {
      params: { userId },
    });

    setRoomId(fetchedRoomId);

    const { data: chatHistory } = await axiosInstance.get<Message[]>(
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

export const initializeWebSocket = (
  roomId: string,
  setConnected: (connected: boolean) => void,
  setError: (error: string | null) => void,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
): Client => {
  const client = new Client({
    webSocketFactory: () => new SockJS(`${axiosInstance.defaults.baseURL}/api-chatbot/ws`),
    onConnect: () => {
      setConnected(true);
      setError(null);

      client.subscribe(`/topic/chat/${roomId}`, message => {
        try {
          const receivedMessage = JSON.parse(message.body);
          if (receivedMessage.content) {
            setMessages((prevMessages: Message[]) => [
              ...prevMessages,
              { ...receivedMessage, message: receivedMessage.content },
            ]);
            console.log("Received AI response:", receivedMessage.content);
          }
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
  return client;
};

export const sendMessage = (
  stompClient: Client,
  userId: number,
  roomId: string | null,
  message: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setError: (error: string | null) => void,
) => {
  const newMessage: Message = {
    userId,
    message,
    roomId,
    timestamp: Date.now(),
  };

  try {
    setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);

    stompClient.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(newMessage),
    });
  } catch (error) {
    console.error("Error sending message:", error);
    setError("Failed to send message. Please try again.");
  }
};
