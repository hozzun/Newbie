import LabelImage from "../../components/mypage/LabelImage";
import ticket from "../../assets/images/직관경기티켓.jpg";
import MemoInput from "../../components/mypage/MemoInput";
import WatchButton from "../../components/mypage/WatchButton";
import GameResult from "../../components/mypage/GameResult";

const WatchGame = () => {
  // TODO: 메모 API 연결, 직관 경기 정보 API 연결, 삭제 API 연결

  const deleteGame = () => {
    console.log("나의 직관 경기 삭제");
  };

  return (
    <>
      <LabelImage date="2024.08.03" imageUrl={ticket} />
      <MemoInput memo="나는야 패배요정" />
      <GameResult team1="삼성 라이온즈" team2="SSG 랜더스" time="18:00" loc="대구" />
      <WatchButton onClick={deleteGame} />
    </>
  );
};

export default WatchGame;
