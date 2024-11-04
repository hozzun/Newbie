interface GameResultProps {
  team1: string;
  team2: string;
  time: string;
  loc: string;
}

const GameResult = (props: GameResultProps) => {
  return (
    <div className="flex justify-center items-center font-kbogothicmedium">
      <div className="m-3">
        <label className="mx-2 text-xs text-gray-600">경기 전</label>
        <label className="mx-2 text-gray-600">{props.time}</label>
        <label className="mx-2 text-gray-300">{props.loc}</label>
      </div>
    </div>
  );
};

export default GameResult;
