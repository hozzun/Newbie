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
  // TODO: 마이페이지 구현 후 필수 인자로 수정
  ticketId?: string;
  year?: string;
  month?: string;
  day?: string;
  teamId?: number;
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
  const [date, setDate] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [img, setImg] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [stadium, setStadium] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [homeId, setHomeId] = useState<number>(0)
  const [awayId, setAwayId] = useState<number>(0)
  const [homeScore, setHomeScore] = useState<number>(0)
  const [awayScore, setAwayScore] = useState<number>(0)

  const nav = useNavigate()

  const getGameData = async () => {

    const params = {
      year: "2024",
      month: "08",
      day: "03",
      teamId: 6
    };

    try {
      const response = await axiosInstance.get("/api-baseball/games", { params }
      );
      setTime(response.data[0].time)
      setStadium(response.data[0].stadium)
      setState(response.data[0].gameResult)
      setHomeId(response.data[0].homeTeamId)
      setAwayId(response.data[0].awayTeamId)
      setHomeScore(response.data[0].homeScore)
      setAwayScore(response.data[0].awayScore)
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      throw error;
    }
  };

  const getInfoAPI = async () => {

    const params = { id: props.ticketId };
  
    try {
      const response = await axiosInstance.get("/api-mypage/ticket", { params });
      console.log(response.data);
      setDate(response.data.date);
      setImg(response.data.imageUrl);
      setText(response.data.text);
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
    nav('/mypage')
  };

  // null 값을 허용하지 않아서 그냥 "doosan"으로 처리(물론 null 값이 나올 일은 없음)
  const teamEnglish = (teamId: number): TeamName | "doosan" => {
    const teamName = Object.keys(ClubId).find((key) => ClubId[key] === teamId);
  
    if (teamName) {
      return teamName as TeamName;
    }

    return "doosan"
  };

  return (
    <>
      <LabelImage date={date} imageUrl={img} />
      <MemoInput memo={text} />
      <GameLabel time={time} loc={stadium} state={state} />
      <GameResult team1={teamEnglish(homeId)} team2={teamEnglish(awayId)} score1={homeScore} score2={awayScore} />
      <WatchButton onClick={deleteGame} />
    </>
  );
};

export default WatchGame;
