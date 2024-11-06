interface GameLabelProps {
  state: string;
  time: string;
  loc: string;
}

const GameLabel = (props: GameLabelProps) => {
  return(
    <>
      <div className="flex flex-row mx-20 my-3 font-kbogothicmedium">
        <div className="flex justify-center items-center mt-1 ml-10 mb-1 text-xs text-gray-600 w-14 h-8 bg-gray-200 rounded-2xl">{props.state}</div>
        <label className="mx-2 mt-1.5 text-gray-600">{props.time}</label>
        <label className="mx-2 mt-1.5 text-gray-300">{props.loc}</label>
      </div>
    </>
  )
}

export default GameLabel