export interface CardStoreItemProps {
  id: number;
  url: string;
  goDetail: () => void;
}

const CardStoreItem = (props: CardStoreItemProps) => {
  return (
    <div
      className="flex items-center justify-center w-full aspect-[2/2.3] bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer"
      onClick={props.goDetail}
    >
      <img src={props.url} alt="선수 포토카드" className="w-full h-full object-cover" />
    </div>
  );
};

export default CardStoreItem;
