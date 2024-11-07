import Coin from "../../assets/icons/copyright-solid.svg?react";
import Karina from "../../assets/images/karina.jpg";

interface PhotoCardData {
  id: string;
  title: string;
  imgSrc: string;
  price: number;
}

interface PhotoCardProps {
  photoCard: PhotoCardData;
  onClick: () => void;
}

const PhotoCard = (props: PhotoCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center" onClick={props.onClick}>
      <div className="aspect-[2/2.4] hover:cursor-pointer">
        <img
          src={Karina}
          alt={props.photoCard.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-row mt-1.5 items-center justify-center">
        <Coin className="text-warning w-3 h-3 mr-1" />
        <p className="text-sm font-kbogothiclight text-gray-700">{props.photoCard.price}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
