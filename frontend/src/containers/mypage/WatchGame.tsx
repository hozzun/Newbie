import axiosInstance from "../../util/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import LabelImage from "../../components/mypage/LabelImage";
import MemoInput from "../../components/mypage/MemoInput";
import WatchButton from "../../components/mypage/WatchButton";
import GameResult from "../../components/mypage/GameResult";
import GameLabel from "../../components/mypage/GameLabel";
import ClubId from "../../util/ClubId";
import Dialog from "../../components/common/Dialog";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import { ButtonProps } from "../../components/common/Button";

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

const WatchGame = () => {
  const { id } = useParams();
  const location = useLocation();
  const { year, month, day, teamId } = location.state || {};
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [ticketInfo, setTicketInfo] = useState<TicketInfoData | null>(null);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [write, setWrite] = useState<string>("");
  const [show, setShow] = useState<boolean>(false)

  const nav = useNavigate();

  const handleModifyChange = (modified: boolean) => {
    setIsModified(modified);
  };

  const handleWriteChange = (newWrite: string) => {
    setWrite(newWrite);
  };

  const getGameData = async () => {
    const params = {
      year: year,
      month: month,
      day: day,
      teamId: teamId,
    };

    try {
      const response = await axiosInstance.get<GameData[]>("/api/v1/baseball/games", { params });
      if (response.data && response.data.length > 0) {
        setGameData(response.data[0]);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  const getInfoAPI = async () => {
    const params = { id: id };
    try {
      const response = await axiosInstance.get<TicketInfoData>("/api/v1/mypage/ticket", { params });
      setTicketInfo(response.data);
      setWrite(response.data.text);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  const deleteGameAPI = async () => {
    const params = { id: id };
    try {
      const response = await axiosInstance.delete("/api/v1/mypage/ticket/delete", { params });
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
    setShow(true)
  };

  const teamEnglish = (teamId: number): TeamName | "doosan" => {
    const teamName = Object.keys(ClubId).find(key => ClubId[key] === teamId);
    return teamName ? (teamName as TeamName) : "doosan";
  };

  const yesButton: ButtonProps = {
    variant: BUTTON_VARIANTS.primary,
    children: "네",
    onClick: () => {
      deleteGameAPI();
      nav("/mypage");
    },
  };

  const noButton: ButtonProps = {
    variant: BUTTON_VARIANTS.yellowGreen,
    children: "아니오",
    onClick: () => setShow(false),
  };

  return (
    <>
      {ticketInfo && <LabelImage date={ticketInfo.date} imageUrl={ticketInfo.imageUrl} />}
      {ticketInfo && (
        <MemoInput
          memo={write}
          onModifyChange={handleModifyChange}
          onWriteChange={handleWriteChange}
        />
      )}
      {ticketInfo && gameData && (
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
            ticketId={id}
            memo={write}
          />
        </>
      )}
      {show && <Dialog title="삭제하기" body="정말 삭제하시겠습니까?" yesButton={yesButton} noButton={noButton} />}
    </>
  );
};

export default WatchGame;
