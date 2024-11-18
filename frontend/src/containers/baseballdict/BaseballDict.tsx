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
  userId: number;
  message: string;
  roomId: string | null;
  timestamp: number;
}

const getAuthHeader = () => {
  const token = window.sessionStorage.getItem("authorization");
  if (!token) {
    throw new Error("인증 토큰을 찾을 수 없습니다.");
  }
  return `Bearer ${token}`;
};

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

      const authHeader = getAuthHeader();

      const { data: fetchedRoomId } = await axiosInstance.post(
        "/api/v1/chatbot/create-room",
        null,
        {
          params: { userId },
          headers: {
            Authorization: authHeader,
          },
        },
      );

      setRoomId(fetchedRoomId);

      const { data: chatHistory } = await axiosInstance.get(`/api/v1/chatbot/${userId}/history`, {
        headers: {
          Authorization: authHeader,
        },
      });

      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching room or chat history:", error);
      if (error instanceof Error && error.message === "인증 토큰을 찾을 수 없습니다.") {
        setError("로그인이 필요합니다.");
      } else {
        setError("채팅방을 불러오는데 실패했습니다. 다시 시도해주세요.");
      }
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
        setError("메시지 처리 중 오류가 발생했습니다.");
      }
    },
    [roomId],
  );

  useEffect(() => {
    if (roomId) {
      try {
        const authHeader = getAuthHeader();

        const client = new Client({
          webSocketFactory: () =>
            new SockJS(`${axiosSocketInstance.defaults.baseURL}/api/v1/chatbot/ws`),
          connectHeaders: {
            Authorization: authHeader,
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
            console.log("WebSocket 연결이 끊어졌습니다.");
            setError("연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
          },
          onStompError: frame => {
            console.error("STOMP error:", frame);
            setError("연결 오류가 발생했습니다. 페이지를 새로고침해주세요.");
          },
          reconnectDelay: 5000,
        });

        client.activate();
        setStompClient(client);

        return () => {
          client.deactivate();
        };
      } catch (error) {
        if (error instanceof Error && error.message === "인증 토큰을 찾을 수 없습니다.") {
          setError("로그인이 필요합니다.");
        } else {
          setError("연결 설정 중 오류가 발생했습니다.");
        }
      }
    }
  }, [roomId, handleWebSocketMessage]);

  const handleSendMessage = useCallback(() => {
    if (!connected) {
      setError("연결이 끊어져 있습니다. 페이지를 새로고침해주세요.");
      return;
    }

    if (!comment.trim()) {
      return;
    }

    if (stompClient && connected) {
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
        setError("메시지 전송에 실패했습니다. 다시 시도해주세요.");
        setMessages(prevMessages => prevMessages.slice(0, -1)); // 에러발생시 마지막메세지제거
      }
    }
  }, [stompClient, connected, comment, roomId, userId]);

  const handleRetry = useCallback(() => {
    setError(null);
    fetchRoomAndHistory();
  }, [fetchRoomAndHistory]);

  return (
    <>
      {isLoading && <div className="flex justify-center items-center h-full">로딩중...</div>}
      {error && (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      )}
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
