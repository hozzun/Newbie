import axiosInstance from "../../util/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import LabelImage from "../../components/mypage/LabelImage";
import MemoInput from "../../components/mypage/MemoInput";
import WatchButton from "../../components/mypage/WatchButton";
import GameResult from "../../components/mypage/GameResult";
import GameLabel from "../../components/mypage/GameLabel";
import ClubId from "../../util/ClubId";

interface WatchGameProps {
  ticketId?: string;
}

interface GameData {
  id: number;
  time: string;
  stadium: string;
  gameResult: string;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
}

interface TicketInfoData {
  date: string;
  imageUrl: string;
  text: string;
}

type TeamName = 
  | "doosan"
  | "hanwha"
  | "kia"
  | "kiwoom"
  | "kt"
  | "lg"
  | "lotte"
  | "nc"
  | "samsung"
  | "ssg";

const WatchGame = (props: WatchGameProps) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [ticketInfo, setTicketInfo] = useState<TicketInfoData | null>(null);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [write, setWrite] = useState<string>("");

  const nav = useNavigate();

  const handleModifyChange = (modified: boolean) => {
    setIsModified(modified);
  };

  // Game data를 불러오는 함수
  const getGameData = async () => {
    const params = {
      year: "2024",
      month: "10",
      day: "28",
      teamId: 1
    };

    try {
      const response = await axiosInstance.get<GameData[]>("/api-baseball/games", { params });
      if (response.data && response.data.length > 0) {
        setGameData(response.data[0]);
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      throw error;
    }
  };

  // Ticket Info를 불러오는 함수
  const getInfoAPI = async () => {
    const params = { id: props.ticketId };
    try {
      const response = await axiosInstance.get<TicketInfoData>("/api-mypage/ticket", { params });
      setTicketInfo(response.data);
      setWrite(response.data.text); // 메모 초기화
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  const deleteGameAPI = async () => {
    const params = { id: props.ticketId };
    try {
      const response = await axiosInstance.delete("/api-mypage/ticket/delete", { params });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  useEffect(() => {
    getGameData();
    getInfoAPI();
  }, []);

  const deleteGame = () => {
    deleteGameAPI();
    nav('/mypage');
  };

  const teamEnglish = (teamId: number): TeamName | "doosan" => {
    const teamName = Object.keys(ClubId).find((key) => ClubId[key] === teamId);
    return teamName ? (teamName as TeamName) : "doosan";
  };

  return (
    <>
      {ticketInfo && <LabelImage date={ticketInfo.date} imageUrl={ticketInfo.imageUrl} />}
      <MemoInput memo={write} onModifyChange={handleModifyChange} onWriteChange={setWrite} />
      {gameData && (
        <>
          <GameLabel time={gameData.time} loc={gameData.stadium} state={gameData.gameResult} />
          <GameResult 
            team1={teamEnglish(gameData.homeTeamId)} 
            team2={teamEnglish(gameData.awayTeamId)} 
            score1={gameData.homeScore} 
            score2={gameData.awayScore} 
          />
          <WatchButton 
            onClick={deleteGame} 
            state={isModified} 
            gameId={gameData.id} 
            ticketId={props.ticketId} 
            memo={write} 
          />
        </>
      )}
    </>
  );
};

export default WatchGame;
