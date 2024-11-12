import { useEffect } from "react";
import PlayerComponent from "../../components/player/Player";
import { useDispatch } from "react-redux";
import { setPlayer } from "../../redux/playerSlice";


const Player = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setPlayer(null));
    };
  });

  return <PlayerComponent />;
};

export default Player;
