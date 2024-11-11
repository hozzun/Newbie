import { useNavigate } from "react-router-dom";
import GameComponent from "../../components/home/Game";
import { GameProps } from "./Home";

const Game = (props: GameProps) => {
  const nav = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const goDetail = () => {
    nav(`/game/result/${props.gameInfo.id}`);
  };

  return props.gameInfo.day < today || props.gameSituation.isPlaying ? (
    <GameComponent {...props} goDetail={goDetail} />
  ) : (
    <GameComponent {...props} />
  );
};

export default Game;
