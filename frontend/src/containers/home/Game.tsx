import { useNavigate } from "react-router-dom";
import GameComponent from "../../components/home/Game";
import { GameProps } from "./Home";
import { useDispatch } from "react-redux";
import { setGame } from "../../redux/gameSlice";

const Game = (props: GameProps) => {
  const dispatch = useDispatch();

  const nav = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const goDetail = () => {
    dispatch(setGame(props));
    nav(`/game/result/${props.gameInfo.id}`);
  };

  return props.gameInfo.day < today || props.gameSituation.isPlaying ? (
    <GameComponent {...props} goDetail={goDetail} />
  ) : (
    <GameComponent {...props} />
  );
};

export default Game;
