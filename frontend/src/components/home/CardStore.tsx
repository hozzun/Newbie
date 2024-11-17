import TextButton from "../common/TextButton";
import CardStoreItem, { CardStoreItemProps } from "./CardStoreItem";

export interface CardStoreProps {
  cardStoreItems: Array<CardStoreItemProps> | null;
  goMore: () => void;
}

const CardStore = (props: CardStoreProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">포토카드 TOP3</p>
        <TextButton onClick={props.goMore}>더보기</TextButton>
      </div>
      <div className="flex justify-between space-x-4 w-[98%] mt-3">
        {props.cardStoreItems &&
          props.cardStoreItems.map(cardStoreItem => (
            <CardStoreItem key={cardStoreItem.photoCardInfo.id} {...cardStoreItem} />
          ))}
      </div>
    </div>
  );
};

export default CardStore;
