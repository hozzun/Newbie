interface GameResultDetailsItemProps {
  key: string;
  value: string;
}

const GameResultDetailsItem = (props: GameResultDetailsItemProps) => {
  return (
    <div className="flex flex-row w-full">
      <p className="text-sm font-kbogothicmedium text-green-900 min-w-[80px]">{props.key}</p>
      <p className="text-sm font-kbogothicmedium text-gray-700">{props.value}</p>
    </div>
  );
};

export default GameResultDetailsItem;
