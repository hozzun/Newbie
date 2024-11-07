import PlayerItem from "../common/PlayerItem";
import SortSelectBox from "../common/SortSelectBox";

const options: Array<string> = ["이름순", "등번호순", "좋아요순"];

const PlayerList = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end">
        <SortSelectBox options={options} minWidth={90} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
      </div>
    </div>
  );
};

export default PlayerList;
