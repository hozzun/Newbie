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

  // email을 userEmail state에 설정
  useEffect(() => {
    if (email) {
      setUserEmail(email);
    }
  }, [email]);

  const fetchRoomAndHistory = useCallback(async () => {
    if (!userEmail) return; // userEmail이 없으면 실행하지 않음

    try {
      setIsLoading(true);
      setError(null);

      const authorization = window.sessionStorage.getItem("access_token");
      if (!authorization) {
        throw new Error("인증 토큰이 없습니다.");
      }

      // 채팅방 생성
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

      // 채팅 히스토리 가져오기
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
      setError(error instanceof Error ? error.message : "채팅방을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [userEmail]);

  // userEmail이 설정되었을 때만 fetchRoomAndHistory 실행
  useEffect(() => {
    if (userEmail) {
      fetchRoomAndHistory();
    }
  }, [userEmail, fetchRoomAndHistory]);

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

  // WebSocket 연결 설정
  useEffect(() => {
    if (roomId && userEmail) {
      const client = new Client({
        webSocketFactory: () =>
          new SockJS(`${axiosSocketInstance.defaults.baseURL}/api/v1/chatbot/ws`),
        connectHeaders: {
          Authorization: `Bearer ${window.sessionStorage.getItem("access_token") || ""}`,
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
        setStompClient(null);
      };
    }
  }, [roomId, userEmail, handleWebSocketMessage]);

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
        setError("메시지 전송에 실패했습니다. 다시 시도해주세요.");
        setMessages(prevMessages => prevMessages.slice(0, -1));
      }
    }
  }, [stompClient, connected, comment, roomId, userEmail]);

  return (
    <div className="h-full">
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-full">
          <div className="text-red-500 text-center">
            <p className="font-kbogothicmedium">연결이 실패했어요</p>
            <p>{error}</p>
            <button
              onClick={() => userEmail && fetchRoomAndHistory()}
              className="font-kbogothicmedium mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              다시 시도해보세요
            </button>
          </div>
        </div>
      )}
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
    </div>
  );
};

export default BaseballDict;
