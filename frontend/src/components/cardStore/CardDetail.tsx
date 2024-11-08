import { useState } from "react";
import Karina from "../../assets/images/karina.jpg";
import Button, { ButtonProps } from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";
import { PhotoCardData } from "./PhotoCard";
import "./CardDetail.css";
import Dialog, { DialogProps } from "../common/Dialog";

interface CardDetailBackItemProps {
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

interface CardDetailProps extends PhotoCardData {
  player: Player;
}

interface CardDetailBackProps extends Player {
  title: string;
}

interface CardDialogBodyPRops {
  title: string;
  playerNo: number;
  playerName: string;
  price: number;
}

const CardDetailFront = (props: PhotoCardData) => {
  return (
    <div className="w-full h-full hover:cursor-pointer">
      <img src={Karina} alt={props.title} className="w-full h-full object-cover rounded-lg" />
    </div>
  );
};

const CardDetailBackItem = (props: CardDetailBackItemProps) => {
  return (
    <div className="flex flex-row">
      <p className="text-sm font-kbogothicmedium text-white min-w-[70px]">{props.label}</p>
      <p className="text-sm font-kbogothicmedium text-white">{props.value}</p>
    </div>
  );
};

const CardDetailBack = (props: CardDetailBackProps) => {
  return (
    <div className="w-full h-full hover:cursor-pointer bg-gray-700 rounded-lg justify-center items-center flex flex-col">
      <p className="text-base font-kbogothicbold text-white">{props.title}</p>
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

const cardDetailProps: CardDetailProps = {
  id: "카드ID",
  title: "2024",
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

const CardDetail = (props: CardDetailProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isOpenedDialog, setIsOpenedDialog] = useState<boolean>(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const onOpenModelClick = () => {
    setIsOpenedDialog(true);
  };

  const onNoClick = () => {
    console.log("구매 취소");
    setIsOpenedDialog(false);
  };

  const yesButton: ButtonProps = {
    variant: BUTTON_VARIANTS.success,
    children: "확인",
    onClick: () => console.log("구매 확인"),
  };

  const noButton: ButtonProps = {
    variant: BUTTON_VARIANTS.second,
    children: "취소",
    onClick: () => onNoClick(),
  };

  const CardDialogBody = (props: CardDialogBodyPRops) => {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-row justify-center items-center w-full">
          <p className="text-sm font-kbogothiclight text-gray-700 text-center">
            <span className="font-kbogothicmedium">
              {props.title} No.{props.playerNo} {props.playerName}{" "}
            </span>
            을(를) {cardDetailProps.price.toLocaleString("ko-KR")}P에 구매하시겠습니까? 구매를
            완료하시려면 '확인'을 눌러주세요.
          </p>
        </div>
        <p className="text-sm font-kbogothiclight text-gray-700 mt-2">
          언제나 만족스러운 쇼핑이 되시길 바랍니다!
        </p>
      </div>
    );
  };

  const cardDialog: DialogProps = {
    title: "구매 확인해주세요!",
    body: (
      <CardDialogBody
        title={cardDetailProps.title}
        playerNo={cardDetailProps.player.no}
        playerName={cardDetailProps.player.name}
        price={cardDetailProps.price}
      />
    ),
    yesButton: yesButton,
    noButton: noButton,
  };

  return (
    <>
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
              <CardDetailBack {...cardDetailProps.player} title={cardDetailProps.title} />
            </div>
          </div>
        </div>
        <Button
          className="w-[80%] mt-8"
          variant={BUTTON_VARIANTS.primary}
          onClick={onOpenModelClick}
        >
          구매하기
        </Button>
      </div>
      {isOpenedDialog && <Dialog {...cardDialog} />}
    </>
  );
};

export default CardDetail;
