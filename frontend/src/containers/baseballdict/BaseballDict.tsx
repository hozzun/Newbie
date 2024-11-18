import { useState, useEffect, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axiosInstance from "../../util/axiosInstance";
import axiosSocketInstance from "../../util/axiosSocketInstance";
import ChatMessages from "../../components/baseballdict/ChatMessages";
import ChatInput from "../../components/baseballdict/ChatInput";
import AIBOT from "../../assets/images/aibot.png";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Message {
  userEmail: string;
  message: string;
  roomId: string;
  timestamp: number;
}

const BaseballDict = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [comment, setComment] = useState("");
  const [roomId, setRoomId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userProfileImage = useSelector((state: RootState) => state.myInfo.profileImage);
  const email = useSelector((state: RootState) => state.myInfo.email);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (email) setUserEmail(email);
  }, [email]);

  const fetchRoomAndHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const authorization = window.sessionStorage.getItem("access_token");

      const { data: fetchedRoomId } = await axiosInstance.post(
        "/api/v1/chatbot/create-room",
        null,
        {
          params: { userEmail },
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        },
      );

      setRoomId(fetchedRoomId);

      const { data: chatHistory } = await axiosInstance.get(
        `/api/v1/chatbot/chatbot/${userEmail}/history`,
        {
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        },
      );

      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching room or chat history:", error);
      setError("Failed to load chat room. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchRoomAndHistory();
  }, [fetchRoomAndHistory]);

  const handleWebSocketMessage = useCallback(
    (messageBody: string) => {
      try {
        const receivedMessage = JSON.parse(messageBody);
        if (receivedMessage.content) {
          const formattedMessage: Message = {
            userEmail: receivedMessage.userEmail || "",
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
        webSocketFactory: () =>
          new SockJS(`${axiosSocketInstance.defaults.baseURL}/api/v1/chatbot/ws`),
        connectHeaders: {
          Authorization: window.sessionStorage.getItem("access_token") || "",
        },
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
        setStompClient(null);
      };
    }
  }, [roomId, handleWebSocketMessage]);

  const handleSendMessage = useCallback(() => {
    if (stompClient && connected && comment.trim()) {
      const newMessage: Message = {
        userEmail,
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

        setMessages(prevMessages => prevMessages.slice(0, -1));
      }
    }
  }, [stompClient, connected, comment, roomId, userEmail]);

  return (
    <>
      {isLoading && <div className="flex justify-center items-center h-full">Loading...</div>}
      {error && <div className="flex justify-center items-center h-full text-red-500">{error}</div>}
      {!isLoading && !error && (
        <>
          <ChatMessages
            messages={messages}
            currentUserEmail={userEmail}
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
