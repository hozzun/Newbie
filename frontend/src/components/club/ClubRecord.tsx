import ClubRecordItem, { ClubRecordItemProps } from "./ClubRecordItem";

interface ClubRecordProps {
  items: Array<ClubRecordItemProps> | null;
}

const ClubRecord = (props: ClubRecordProps) => {
  return (
    <div className="flex flex-col mt-2">
      {props.items ? (
        <div className="grid grid-cols-4 gap-3 w-full">
          {props.items.map((item, index) => (
            <ClubRecordItem key={index} {...item} />
          ))}
        </div>
      ) : (
        <p className="text-base font-kbogothicmedium text-gray-700">구단 성적이 없습니다...😥</p>
      )}
    </div>
  );
};

export default ClubRecord;
