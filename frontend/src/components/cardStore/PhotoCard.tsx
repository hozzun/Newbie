import Coin from "../../assets/icons/copyright-solid.svg?react";
import { PhotoCardInfo } from "../../containers/cardstore/CardStore";

interface PhotoCardProps {
  photoCard: PhotoCardInfo;
  onClick: () => void;
}

const PhotoCard = (props: PhotoCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center" onClick={props.onClick}>
      <div className="w-full aspect-[2/2.4] hover:cursor-pointer">
        <img
          src={props.photoCard.imageUrl}
          alt={props.photoCard.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-row mt-1.5 items-center justify-center">
        <Coin className="text-warning w-3 h-3 mr-1" />
        <p className="text-xs font-kbogothiclight text-gray-700">
          {props.photoCard.price.toLocaleString("ko-KR")}
        </p>
      </div>
    </div>
  );
};

export default PhotoCard;
