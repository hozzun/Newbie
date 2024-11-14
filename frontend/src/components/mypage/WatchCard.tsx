interface WatchCardProps {
  img: string;
  date: string;
  team1: string;
  team2: string;
  onClick: () => void;
}

const WatchCard = (props: WatchCardProps) => {
  const team1 = props.team1.split(' ')[0];
  const team2 = props.team2.split(' ')[0];

  return (
    <div className="relative w-full mt-7 ml-5 hover:cursor-pointer" onClick={props.onClick}>
      <img src={props.img} alt="ticket" className="w-full h-44 object-cover rounded-2xl" />

      <div className="absolute bottom-0 left-0 w-full h-14 bg-gray-700 bg-opacity-70 rounded-2xl flex flex-col justify-center items-center text-white font-kbogothicbold">
        <p className="text-[10px]">{props.date}</p>
        <p className="text-sm mt-1">{team1} VS {team2}</p>
      </div>
    </div>
  );
}

export default WatchCard;
