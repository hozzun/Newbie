import { PlayerItemProps } from "../../containers/player/PlayerList";
import PlayerItem from "../common/PlayerItem";
import SortSelectBox from "../common/SortSelectBox";

interface PlayerListProps {
  hasMore: boolean;
  observeRef: React.RefObject<HTMLDivElement> | null;
  selectedSortOption: string;
  handleSelectSortOption: (value: string) => void;
  players: Array<PlayerItemProps> | null;
}

const options: Array<string> = ["이름순", "등번호순", "좋아요순"];

const PlayerList = (props: PlayerListProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end">
        <SortSelectBox
          options={options}
          minWidth={100}
          selectedSortOption={props.selectedSortOption}
          handleSelectSortOption={props.handleSelectSortOption}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {props.players && props.players.map(player => <PlayerItem key={player.id} {...player} />)}
      </div>
      {props.hasMore && <div ref={props.observeRef} className="h-2" />}
    </div>
  );
};

export default PlayerList;
