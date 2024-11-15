import PhotoCard from "./PhotoCard";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";
import ClubFullName from "../../util/ClubFullName";
import { getIdByNum } from "../../util/ClubId"

interface Player {
  backNumber: string
  name: string
  teamId: number
  position: string
  birth: string
  physical: string
  academic: string
}

interface CardDetailProps {
  player: Player;
  image: string;
  onClick: () => void;
}

const CardDetail = ({ player, image, onClick }: CardDetailProps) => {

  const teamEnglish = getIdByNum(player.teamId)

  return (
    <div className="flex flex-col items-center p-5">
      <PhotoCard className="h-60 rounded-2xl mb-3" imgSrc={image} />

      <div className="mt-4 text-center">
        <p className="text-lg font-kbogothicbold m-3">
          No.{player.backNumber} {player.name}
        </p>
      </div>

      <div className="grid grid-cols-2 my-4 gap-5 bg-gray-100 rounded-2xl p-5">
        <p className="text-green-900 font-kbogothicmedium">소속구단</p>
        {teamEnglish && <p className="text-gray-600 font-kbogothicmedium">{ClubFullName[teamEnglish]}</p>}
        <p className="text-green-900 font-kbogothicmedium">생년월일</p>
        <p className="text-gray-600 font-kbogothicmedium">{player.birth}</p>
        <p className="text-green-900 font-kbogothicmedium">체격</p>
        <p className="text-gray-600 font-kbogothicmedium">{player.physical}</p>
        <p className="text-green-900 font-kbogothicmedium">학력</p>
        <p className="text-gray-600 font-kbogothicmedium">{player.academic}</p>
        <p className="text-green-900 font-kbogothicmedium">포지션</p>
        <p className="text-gray-600 font-kbogothicmedium">{player.position}</p>
      </div>
      <Button className="w-[55%] mt-5" variant={BUTTON_VARIANTS.second} children="삭제하기" onClick={onClick} />
    </div>
  );
};

export default CardDetail;
