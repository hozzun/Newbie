import { useEffect } from "react";
import PlayerComponent from "../../components/player/Player";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer } from "../../redux/playerSlice";
import { RootState } from "../../redux/store";


const Player = () => {
  const dispatch = useDispatch();

  const playerInfo = useSelector((state: RootState) => state.player.player);

  useEffect(() => {
    return () => {
      dispatch(setPlayer(null));
    };
  });

  return <PlayerComponent playerInfo={playerInfo} />;
};

export default Player;
