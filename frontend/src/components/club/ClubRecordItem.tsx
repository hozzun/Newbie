export interface ClubRecordItemProps {
  label: string;
  value: number;
}

const ClubRecordItem = (props: ClubRecordItemProps) => {
  return (
    <div className="flex flex-col mx-auto justify-center items-center p-2 bg-gray-100 rounded-lg aspect-[1/1] max-w-[96px] w-full hover:bg-gray-200/50 hover:cursor-pointer">
      <p className="text-sm font-kbogothiclight text-gray-700">{props.label}</p>
      <p className="text-base font-kbogothicbold text-gray-700">{props.value}</p>
    </div>
  );
};

export default ClubRecordItem;
