import { useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import Button, { ButtonProps } from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";
import Dialog from "../common/Dialog";
import { useNavigate } from "react-router-dom";

interface WatchButtonProps {
  onClick: () => void;
  gameId: number;
  ticketId?: string;
  memo?: string;
  state: boolean;
}

const WatchButton = (props: WatchButtonProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const nav = useNavigate();

  const handleGoGamePageClick = () => {
    if (props.state) {
      setShowDialog(true);
    } else {
      nav(`/game/result/${props.gameId}`);
    }
  };

  const putText = async () => {
    const Text = {
      id: props.ticketId,
      text: props.memo
    };
  
    try {
      const response = await axiosInstance.put("/api/v1/mypage/ticket/text", Text);
      console.log(response);
    } catch (error) {
      console.error("Error fetching cheer song:", error);
    }
  };

  const yesNav = () => {
    putText()
    setShowDialog(false);
    nav(`/game/result/${props.gameId}`);
  };

  const noNav = () => {
    setShowDialog(false);
    nav(`/game/result/${props.gameId}`);
  };

  const yesSave: ButtonProps = {
    variant: BUTTON_VARIANTS.primary,
    children: "네",
    onClick: () => yesNav,
  };

  const noSave: ButtonProps = {
    variant: BUTTON_VARIANTS.yellowGreen,
    children: "아니오",
    onClick: () => noNav,
  };

  return (
    <>
      <div className="flex justify-center items-center flex-row mt-3">
        <Button
          className="flex justify-center items-center w-36 h-10 m-2"
          variant={BUTTON_VARIANTS.primary}
          children="경기 정보"
          onClick={handleGoGamePageClick}
        />
        <Button
          className="flex justify-center items-center w-36 h-10 m-2 bg-green-50"
          variant={BUTTON_VARIANTS.primaryText}
          children="삭제하기"
          onClick={props.onClick}
        />
      </div>

      {/* Dialog 표시 */}
      {showDialog && props.state && (
        <Dialog
          title="알림"
          body="수정 사항이 있습니다. 저장하시겠습니까?"
          yesButton={yesSave}
          noButton={noSave}
        />
      )}
    </>
  );
};

export default WatchButton;
