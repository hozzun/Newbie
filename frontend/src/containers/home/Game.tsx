import GameComponent, { GameProps } from "../../components/home/Game";

const Game = (props: GameProps) => {
  const today = new Date().toISOString().split("T")[0];

  const goDetail = () => {
    // TODO: MOVE - 경기 결과 페이지
    console.log("경기 결과 페이지 이동");
  };

  return props.gameInfo.day < today || props.gameSituation.isPlaying ? (
    <GameComponent {...props} goDetail={goDetail} />
  ) : (
    <GameComponent {...props} />
  );
};

export default Game;
