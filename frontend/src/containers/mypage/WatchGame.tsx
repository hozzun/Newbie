// import axios from 'axios';
// import { useEffect } from 'react';
import LabelImage from "../../components/mypage/LabelImage";
import ticket from "../../assets/images/직관경기티켓.jpg";
import MemoInput from "../../components/mypage/MemoInput";
import WatchButton from "../../components/mypage/WatchButton";
import GameResult from "../../components/mypage/GameResult";
import GameLabel from "../../components/mypage/GameLabel";

const WatchGame = () => {
  // TODO: 메모 API 연결, 직관 경기 정보 API 연결, 삭제 API 연결

  // const getGameData = async (params: { [key: string]: string | number }) => {
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
  //   // TODO: 직관 경기 정보 실제 데이터 연동
  //   const params = {
  //     year: '2024',
  //     month: '8',
  //     day: '3',
  //     teamId: 2
  //   };
    
  //   getGameData(params);
  // }, []);

  const deleteGame = () => {
    console.log("나의 직관 경기 삭제");
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
