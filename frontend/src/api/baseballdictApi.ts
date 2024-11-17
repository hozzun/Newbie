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

    // 임의로 userId를 1로 설정
    const testUserId = 1;

    // create-room API는 호출하지 않고 임의로 roomId 설정
    const fetchedRoomId = `${testUserId}`; // 테스트로 userId를 Room ID로 가정
    setRoomId(fetchedRoomId);

    // userId 기반으로 chat history 조회
    const { data: chatHistory } = await axiosInstance.get<Message[]>(
      `/api-chatbot/chatbot/${testUserId}/history`, // userId를 경로에 사용
    );

    // 응답 데이터를 메시지 리스트에 설정
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

      client.subscribe(`/topic/chatbot/${roomId}`, message => {
        try {
          const receivedMessage = JSON.parse(message.body);
          if (receivedMessage.content) {
            setMessages((prevMessages: Message[]) => [
              ...prevMessages,
              { ...receivedMessage, message: receivedMessage.content },
            ]);
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
      destination: `/app-chatbot/chatbot/${roomId}`,
      body: JSON.stringify(newMessage),
    });
  } catch (error) {
    console.error("Error sending message:", error);
    setError("Failed to send message. Please try again.");
  }
};
