import PlayerCarousel from "./PlayerCarousel";
import { PlayerRecordItemProps } from "./PlayerRecordItem";

interface PlayerRecordProps {
  label: string;
  items: Array<PlayerRecordItemProps> | null;
}

const PlayerRecord = (props: PlayerRecordProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full mb-3">
        <p className="text-2xl font-kbogothicbold text-gray-700">{props.label}</p>
      </div>
      {props.items ? (
        <PlayerCarousel itemCount={4} items={props.items} />
      ) : (
        <p className="text-base font-kbogothiclight text-gray-700">이번 시즌 성적이 없습니다...</p>
      )}
    </div>
  );
};

export default PlayerRecord;
