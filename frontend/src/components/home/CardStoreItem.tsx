import { PhotoCardInfo } from "../../containers/cardstore/CardStore";

export interface CardStoreItemProps {
  photoCardInfo: PhotoCardInfo;
  goDetail: () => void;
}

const CardStoreItem = (props: CardStoreItemProps) => {
  return (
    <div
      className="flex items-center justify-center w-full aspect-[2/2.4] bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer"
      onClick={props.goDetail}
    >
      <img
        src={props.photoCardInfo.imageUrl}
        alt="선수 포토카드"
        className="w-full h-full object-fill"
      />
    </div>
  );
};

export default CardStoreItem;
