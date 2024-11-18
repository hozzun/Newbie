import { useState } from "react";
import Button, { ButtonProps } from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";
import "./CardDetail.css";
import Dialog, { DialogProps } from "../common/Dialog";
import ClubFullName from "../../util/ClubFullName";
import { PhotoCardInfo } from "../../containers/cardstore/CardStore";
import { PlayerInfo } from "../../containers/cardstore/CardDetail";

export interface CardDetailProps {
  photoCardInfo: PhotoCardInfo | null;
  playerInfo: PlayerInfo | null;
  isVisibleResult: boolean;
  isBuySuccess: boolean;
  handleBuyPhotoCard: () => void;
}

interface CardDetailBackItemProps {
  label: string;
  value: string;
}

const clubColors: Record<string, string> = {
  kia: "bg-club-kia",
  samsung: "bg-club-samsung",
  lg: "bg-club-lg",
  doosan: "bg-club-doosan",
  kt: "bg-club-kt",
  ssg: "bg-club-ssg",
  lotte: "bg-club-lotte",
  hanwha: "bg-club-hanwha",
  nc: "bg-club-nc",
  kiwoom: "bg-club-kiwoom",
};

const CardDetailFront = (props: PhotoCardInfo) => {
  return (
    <div className="w-full h-full hover:cursor-pointer">
      <img
        src={props.imageUrl}
        alt={`${props.title} No.${props.backNumber} ${props.name}`}
        className="w-full h-full object-cover rounded-lg"
      />
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

const CardDetailBack = (props: CardDetailProps) => {
  if (!props.photoCardInfo || !props.playerInfo) {
    return;
  }

  return (
    <div
      className={`w-full h-full hover:cursor-pointer ${clubColors[props.photoCardInfo.teamId]} rounded-lg justify-center items-center flex flex-col`}
    >
      <p className="text-base font-kbogothicbold text-white">{props.photoCardInfo.title}</p>
      <p className="text-base font-kbogothicbold text-white">
        No.{props.photoCardInfo.backNumber} {props.photoCardInfo.name}
      </p>
      <div className="flex flex-col space-y-2 mt-10">
        <CardDetailBackItem label="소속구단" value={ClubFullName[props.photoCardInfo.teamId]} />
        <CardDetailBackItem label="포지션" value={props.playerInfo.position} />
        <CardDetailBackItem label="생년월일" value={props.playerInfo.birth.replace(/-/g, ".")} />
        <CardDetailBackItem label="체격" value={props.playerInfo.physical} />
        <CardDetailBackItem label="학력" value={props.playerInfo.education} />
      </div>
    </div>
  );
};

const CardDialogBody = (props: PhotoCardInfo) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-row justify-center items-center w-full">
        <p className="text-sm font-kbogothiclight text-gray-700 text-center">
          <span className="font-kbogothicmedium">
            {props.title} No.{props.backNumber} {props.name}{" "}
          </span>
          을(를) {props.price.toLocaleString("ko-KR")}P에 구매하시겠습니까? 구매를 완료하시려면
          '확인'을 눌러주세요.
        </p>
      </div>
      <p className="text-sm font-kbogothiclight text-gray-700 mt-2">
        언제나 만족스러운 쇼핑이 되시길 바랍니다!
      </p>
    </div>
  );
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
    setIsOpenedDialog(false);
  };

  const yesButton: ButtonProps = {
    variant: BUTTON_VARIANTS.success,
    children: "확인",
    onClick: () => props.handleBuyPhotoCard(),
  };

  const noButton: ButtonProps = {
    variant: BUTTON_VARIANTS.second,
    children: "취소",
    onClick: () => onNoClick(),
  };

  if (!props.photoCardInfo || !props.playerInfo) {
    return (
      <div className="flex w-full justify-center items-center">
        <p className="text-base font-kbogothicmedium text-gray-700">
          포토 카드 정보가 없습니다...😥
        </p>
      </div>
    );
  }

  const cardDialog: DialogProps = {
    title: "구매 확인해주세요!",
    body: <CardDialogBody {...props.photoCardInfo} />,
    yesButton: yesButton,
    noButton: noButton,
  };

  const resultDialog: DialogProps = {
    title: props.isBuySuccess ? "카드 구매 성공!" : "카드 구매 실패!",
    body: props.isBuySuccess
      ? "축하합니다! 선택하신 카드를 성공적으로 구매하였습니다. 지금 바로 카드를 확인하고 이용해보세요. 😊"
      : "죄송합니다. 선택하신 카드의 구매가 실패하였습니다. 이미 구매한 카드이거나 마일리지가 부족할 수 있습니다. 상세 내용을 확인하시고 다시 시도해주세요. 문제가 지속될 경우 고객센터로 문의해주시면 빠르게 도와드리겠습니다. 🙏",
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
              <CardDetailFront {...props.photoCardInfo} />
            </div>
            <div className="card-side card-side-back absolute inset-0 flex items-center justify-center rotate-y-180">
              <CardDetailBack {...props} />
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
      {props.isVisibleResult && <Dialog {...resultDialog} />}
    </>
  );
};

export default CardDetail;
