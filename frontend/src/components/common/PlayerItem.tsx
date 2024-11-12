import Karina from "../../assets/images/karina.jpg";
import Heart from "../../assets/icons/heart-solid.svg?react";
import { PlayerItemProps } from "../../containers/player/PlayerList";

const PlayerItem = (props: PlayerItemProps) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative aspect-[2/2.4] hover:cursor-pointer">
        <img src={Karina} alt="인물 사진" className="w-full h-full object-cover rounded-lg" />
        <p className="absolute left-1/2 transform -translate-x-1/2 bottom-2 w-[92%] text-center bg-black bg-opacity-75 text-white text-sm p-1 rounded-lg font-kbogothicmedium">
          {props.name}
        </p>
      </div>
      <div className="flex flex-row justify-center items-center w-full mt-2">
        <Heart className="w-3 h-3 text-error-400 mr-0.9" />
        <p className="text-xs font-kbogothiclight text-gray-700">{props.likeCount}</p>
      </div>
    </div>
  );
};

export default PlayerItem;
