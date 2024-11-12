export interface PlayerRecordItemProps {
  label: string;
  value: number | string;
}

const PlayerRecordItem = (props: PlayerRecordItemProps) => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center p-2 bg-gray-100 rounded-lg aspect-[1/1] max-w-[96px] w-full">
      <p className="text-sm font-kbogothiclight text-gray-700" style={{ userSelect: "none" }}>
        {props.label}
      </p>
      <p className="text-base font-kbogothicbold text-gray-700" style={{ userSelect: "none" }}>
        {props.value}
      </p>
    </div>
  );
};

export default PlayerRecordItem;
