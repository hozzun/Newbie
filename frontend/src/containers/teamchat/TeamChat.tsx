import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamChatComponent from "../../components/teamchat/TeamChat";
import ClubLogos from "../../util/ClubLogos";

interface TeamChatData {
  id: string;
  teamName: string;
  teamKey: keyof typeof ClubLogos;
  lastMessage: string;
  lastMessageTime: string;
}

const TeamChat = () => {
  const [chatRooms, setChatRooms] = useState<TeamChatData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 더미 데이터 로드
    const dummyData: TeamChatData[] = [
      {
        id: "lg",
        teamName: "LG 트윈스",
        teamKey: "lg",
        lastMessage: "오늘 경기 이겼습니다!",
        lastMessageTime: "오후 3:24",
      },
      {
        id: "doosan",
        teamName: "두산 베어스",
        teamKey: "doosan",
        lastMessage: "다음 경기 일정 안내드립니다.",
        lastMessageTime: "오후 2:15",
      },
      {
        id: "kia",
        teamName: "KIA 타이거즈",
        teamKey: "kia",
        lastMessage: "팬 감사 이벤트를 진행합니다.",
        lastMessageTime: "오전 10:30",
      },
      {
        id: "hanwha",
        teamName: "한화 이글스",
        teamKey: "hanwha",
        lastMessage: "새로운 선수 영입 소식!",
        lastMessageTime: "오후 1:20",
      },
      {
        id: "lotte",
        teamName: "롯데 자이언츠",
        teamKey: "lotte",
        lastMessage: "부산에서 팬미팅이 열립니다.",
        lastMessageTime: "오전 9:15",
      },
      {
        id: "ssg",
        teamName: "SSG 랜더스",
        teamKey: "ssg",
        lastMessage: "다음 경기 일정 업데이트.",
        lastMessageTime: "오후 4:00",
      },
      {
        id: "kiwoom",
        teamName: "키움 히어로즈",
        teamKey: "kiwoom",
        lastMessage: "새로운 굿즈 출시 예정!",
        lastMessageTime: "오전 8:45",
      },
      {
        id: "samsung",
        teamName: "삼성 라이온즈",
        teamKey: "samsung",
        lastMessage: "승리 축하 메시지!",
        lastMessageTime: "오후 5:15",
      },
      {
        id: "kt",
        teamName: "KT 위즈",
        teamKey: "kt",
        lastMessage: "경기 일정 변경 공지.",
        lastMessageTime: "오전 11:50",
      },
      {
        id: "nc",
        teamName: "NC 다이노스",
        teamKey: "nc",
        lastMessage: "다음 경기는 창원에서 열립니다.",
        lastMessageTime: "오후 3:00",
      },
    ];
    setChatRooms(dummyData);
  }, []);

  const handleChatClick = (id: string) => {
    navigate(`/teamchat/${id}`); // 특정 채팅방으로 이동
  };

  return (
    <div>
      {chatRooms.map(chatRoom => (
        <TeamChatComponent
          key={chatRoom.id}
          chatData={chatRoom}
          logoSrc={ClubLogos[chatRoom.teamKey]}
          onChatClick={handleChatClick}
        />
      ))}
    </div>
  );
};

export default TeamChat;
