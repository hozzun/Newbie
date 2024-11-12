import TextButton from "../common/TextButton";
import PlayerItem from "../common/PlayerItem";
import { PlayerItemProps } from "../../containers/player/PlayerList";

export interface PlayerListProps {
  players: Array<PlayerItemProps> | null;
  goMore: () => void;
}

const PlayerList = (props: PlayerListProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">선수단</p>
        <TextButton onClick={props.goMore}>더보기</TextButton>
      </div>
      <div className="flex justify-between space-x-4 w-[98%] mt-3">
        {props.players && props.players.map(player => <PlayerItem key={player.id} {...player} />)}
      </div>
    </div>
  );
};

export default PlayerList;
