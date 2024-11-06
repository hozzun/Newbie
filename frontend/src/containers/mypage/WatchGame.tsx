import axios from "axios";
// import { useEffect } from 'react';
import LabelImage from "../../components/mypage/LabelImage";
import ticket from "../../assets/images/직관경기티켓.jpg";
import MemoInput from "../../components/mypage/MemoInput";
import WatchButton from "../../components/mypage/WatchButton";
import GameResult from "../../components/mypage/GameResult";
import GameLabel from "../../components/mypage/GameLabel";

const WatchGame = () => {
  // TODO: 메모 API 연결

  // const getGameData = async () => {

  //   // TODO: 직관 경기 정보 실제 데이터 연동
  //   const params = {
  //     year: '2024',
  //     month: '8',
  //     day: '3',
  //     teamId: 2
  //   };

  //   try {
  //     const response = await axios.get('api주소', {
  //       params: params,
  //     });
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('API 요청 중 오류 발생:', error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   getGameData();
  // }, []);

  const deleteGameAPI = async () => {
    const api_url = import.meta.env.VITE_TICKET_DELETE;
    const id = "672b18692d22ab456ed56763"; // TODO: 데이터 수정
  
    try {
      const response = await axios.delete(api_url, {
        params: { id },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  const deleteGame = () => {
    deleteGameAPI();
  };

  return (
    <>
      <LabelImage date="2024.08.03" imageUrl={ticket} />
      <MemoInput memo="나는야 패배요정" />
      <GameLabel time="18:00" loc="대구" state="경기전" />
      <GameResult team1="삼성 라이온즈" team2="SSG 랜더스" score1={0} score2={0} />
      <WatchButton onClick={deleteGame} />
    </>
  );
};

export default WatchGame;
