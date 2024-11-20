import { PlayerInfo } from "../../containers/player/PlayerList";
import ClubFullName from "../../util/ClubFullName";

interface PlayerProfileProps {
  playerInfo: PlayerInfo | null;
}

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

const PlayerProfile = (props: PlayerProfileProps) => {
  if (!props.playerInfo) {
    return (
      <div className="flex flex-col min-w-[50%]">
        <p className="text-base font-kbogothicmedium text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-w-[50%]">
      <p className="text-base font-kbogothicbold text-gray-700">
        {ClubFullName[props.playerInfo.teamId]}
      </p>
      <p className="text-base font-kbogothicbold text-gray-700">
        {props.playerInfo.backNumber
          ? `No.${props.playerInfo.backNumber} ${props.playerInfo.name}`
          : props.playerInfo.name}
      </p>
      <div className="flex flex-col space-y-1 mt-6">
        <PlayerProfileItem label="포지션" value={props.playerInfo.position} />
        <PlayerProfileItem label="출생" value={props.playerInfo.birth.replace(/-/g, ".")} />
        <PlayerProfileItem label="신체" value={props.playerInfo.physical} />
        <PlayerProfileItem
          label="좋아요"
          value={props.playerInfo.likeCount.toLocaleString("ko-KR")}
        />
      </div>
    </div>
  );
};

export default PlayerProfile;
