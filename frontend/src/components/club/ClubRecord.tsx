import ClubRecordItem from "./ClubRecordItem";

const ClubRecord = () => {
  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-row justify-center items-center space-x-2 w-full">
        <ClubRecordItem />
        <ClubRecordItem />
        <ClubRecordItem />
        <ClubRecordItem />
      </div>
      <div className="flex flex-row justify-center items-center space-x-2 mt-3 w-full">
        <ClubRecordItem />
        <ClubRecordItem />
        <ClubRecordItem />
        <ClubRecordItem />
      </div>
    </div>
  );
};

export default ClubRecord;
