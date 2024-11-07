import { useState } from "react";
import Karina from "../../assets/images/karina.jpg";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";
import { PhotoCardData } from "./PhotoCard";
import "./CardDetail.css";

interface CardDetailBackProps {
  label: string;
  value: string;
}

interface Player {
  name: string;
  no: number;
  clubName: string;
  position: string;
  birthday: string;
  bodyInfo: string;
  finalEducation: string;
}

interface PhotoCardDetailProps extends PhotoCardData {
  player: Player;
}

const CardDetailFront = (props: PhotoCardData) => {
  return (
    <div className="w-full h-full hover:cursor-pointer">
      <img src={Karina} alt={props.title} className="w-full h-full object-cover rounded-lg" />
    </div>
  );
};

const CardDetailBackItem = (props: CardDetailBackProps) => {
  return (
    <div className="flex flex-row">
      <p className="text-sm font-kbogothicmedium text-white min-w-[70px]">{props.label}</p>
      <p className="text-sm font-kbogothicmedium text-white">{props.value}</p>
    </div>
  );
};

const CardDetailBack = (props: Player) => {
  return (
    <div className="w-full h-full hover:cursor-pointer bg-gray-700 rounded-lg justify-center items-center flex flex-col">
      <p className="text-base font-kbogothicbold text-white">
        No.{props.no} {props.name}
      </p>
      <div className="flex flex-col space-y-2 mt-10">
        <CardDetailBackItem label="소속구단" value={props.clubName} />
        <CardDetailBackItem label="포지션" value={props.position} />
        <CardDetailBackItem label="생년월일" value={props.birthday} />
        <CardDetailBackItem label="체격" value={props.bodyInfo} />
        <CardDetailBackItem label="최종학력" value={props.finalEducation} />
      </div>
    </div>
  );
};

const cardDetailProps: PhotoCardDetailProps = {
  id: "카드ID",
  title: "카드이름",
  imgSrc: "카드URL",
  price: 1000,
  player: {
    name: "카리나",
    no: 1,
    clubName: "에스파",
    position: "리더",
    birthday: "2000.01.01",
    bodyInfo: "모름",
    finalEducation: "모름",
  },
};

const CardDetail = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = () => {
    console.log("click");
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-center w-[80%] aspect-[2/3] perspective">
        <div
          className={`w-full h-full transform transition duration-1000 relative preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
          onClick={handleFlip}
        >
          <div className="card-side card-side-front absolute inset-0 flex items-center justify-center w-full h-full">
            <CardDetailFront
              id={cardDetailProps.id}
              title={cardDetailProps.title}
              imgSrc={cardDetailProps.imgSrc}
              price={cardDetailProps.price}
            />
          </div>
          <div className="card-side card-side-back absolute inset-0 flex items-center justify-center rotate-y-180">
            <CardDetailBack {...cardDetailProps.player} />
          </div>
        </div>
      </div>
      <Button className="w-[80%] mt-8" variant={BUTTON_VARIANTS.primary}>
        구매하기
      </Button>
    </div>
  );
};

export default CardDetail;
