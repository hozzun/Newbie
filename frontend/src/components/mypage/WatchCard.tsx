interface WatchCardProps {
  img: string;
  onClick: () => void;
}

const WatchCard = (props: WatchCardProps) => {
  return (
    <>
      <img src={props.img} alt="ticket" className="w-full h-44 rounded-2xl mt-7 ml-5 hover:cursor-pointer" onClick={props.onClick}/>
    </>
  )
}

export default WatchCard