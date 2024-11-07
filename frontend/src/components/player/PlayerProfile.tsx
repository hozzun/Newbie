interface PlayerProfileItemProps {
  label: string;
  value: string;
}

const PlayerProfileItem = (props: PlayerProfileItemProps) => {
  return (
    <div className="flex flex-row items-center">
      <p className="text-sm font-kbogothiclight text-gray-700 min-w-[40px] mr-1">{props.label}</p>
      <p className="text-sm font-kbogothicmedium text-gray-700">{props.value}</p>
    </div>
  );
};

const PlayerProfile = () => {
  return (
    <div className="flex flex-col min-w-[50%]">
      <p className="text-base font-kbogothicbold text-gray-700">SSG 랜더스</p>
      <p className="text-base font-kbogothicbold text-gray-700">No.42 김광현</p>
      <div className="flex flex-col space-y-1 mt-6">
        <PlayerProfileItem label="포지션" value="투수" />
        <PlayerProfileItem label="출생" value="2003.01.03" />
        <PlayerProfileItem label="신체" value="165cm / 68kg" />
        <PlayerProfileItem label="좋아요" value="1,000" />
      </div>
    </div>
  );
};

export default PlayerProfile;
