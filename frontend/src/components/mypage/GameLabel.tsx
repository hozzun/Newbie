interface GameLabelProps {
  state: string;
  time: string;
  loc: string;
}

const GameLabel = (props: GameLabelProps) => {
  return (
    <div className="flex flex-row my-3 font-kbogothicmedium justify-center w-full items-center">
      <div className="flex justify-start mr-40">
        <div className="flex justify-center items-center mt-1 ml-3 mb-1 text-xs text-gray-600 w-14 h-8 bg-gray-200 rounded-2xl">
          {props.state}
        </div>
        <label className="mx-2 mt-1.5 text-gray-600">{props.time}</label>
        <label className="mx-2 mt-1.5 text-gray-300">{props.loc}</label>
      </div>
    </div>
  );
};

export default GameLabel;
