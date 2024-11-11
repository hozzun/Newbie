import PhotoCard from "./PhotoCard";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";

interface Player {
  cardImg: string;
  number: string;
  name: string;
  team: string;
  birthday: string;
  physical: string;
  position: string;
  academic: string;
}

interface CardDetailProps {
  player: Player;
  onClick: () => void;
}

const CardDetail = ({ player, onClick }: CardDetailProps) => {
  return (
    <div className="flex flex-col items-center p-5">
      <PhotoCard imgSrc={player.cardImg} />

      <div className="mt-4 text-center">
        <p className="text-lg font-kbogothicbold m-3">
          No.{player.number} {player.name}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 m-5 bg-gray-100 rounded-2xl p-10">
        <p className="text-green-900 font-kbogothicmedium">소속구단</p>
        <p className="text-gray-600 font-kbogothicmedium">{player.team}</p>
        <p className="text-green-900 font-kbogothicmedium">생년월일</p>
        <p className="text-gray-600 font-kbogothicmedium">{player.birthday}</p>
        <p className="text-green-900 font-kbogothicmedium">체격</p>
        <p className="text-gray-600 font-kbogothicmedium">{player.physical}</p>
        <p className="text-green-900 font-kbogothicmedium">최종학력</p>
        <p className="text-gray-600 font-kbogothicmedium">{player.academic}</p>
        <p className="text-green-900 font-kbogothicmedium">포지션</p>
        <p className="text-gray-600 font-kbogothicmedium">{player.position}</p>
      </div>
      <Button className="w-[55%] mt-5" variant={BUTTON_VARIANTS.second} children="삭제하기" onClick={onClick} />
    </div>
  );
};

export default CardDetail;