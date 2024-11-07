import PlayerHightlightItem from "./PlayerHightlightItem";

const PlayerHighlight = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full mb-3">
        <p className="text-2xl font-kbogothicbold text-gray-700">하이라이트</p>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        <PlayerHightlightItem />
        <PlayerHightlightItem />
        <PlayerHightlightItem />
        <PlayerHightlightItem />
        <PlayerHightlightItem />
        <PlayerHightlightItem />
        <PlayerHightlightItem />
        <PlayerHightlightItem />
        <PlayerHightlightItem />
        <PlayerHightlightItem />
      </div>
    </div>
  );
};

export default PlayerHighlight;
