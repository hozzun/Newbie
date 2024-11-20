import Like from "../../assets/icons/heart-solid.svg?react";
import Trash from "../../assets/icons/trash.svg?react";
import Dialog from "../../components/common/Dialog";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import { ButtonProps } from "../../components/common/Button";
import { useState } from "react"
import axiosInstance from "../../util/axiosInstance";
import { useNavigate } from "react-router-dom";

interface LikeProps {
  time: string;
  content: string;
  activityId: number;
  boardId: number;
}

const MyActiveLike = ({ time, content, activityId, boardId }: LikeProps) => {

  const nav = useNavigate()
  const [show, setShow] = useState<boolean>(false)

  const deleteActivity = async (activityId: number) => {

    const params = { activityId: activityId };

    try {
      const response = await axiosInstance.delete(`/api/v1/board/user-activity/${activityId}`, {
        params,
      });
      return response.data
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const yesRemove: ButtonProps = {
    variant: BUTTON_VARIANTS.primary,
    children: "네",
    onClick: () => {
      deleteActivity(activityId)
      setShow(false)
    }
  };

  const noRemove: ButtonProps = {
    variant: BUTTON_VARIANTS.yellowGreen,
    children: "아니오",
    onClick: () => setShow(false)
  };

  return (
    <div className="flex flex-col m-3">
      <p className="font-kbogothicmedium text-gray-600 text-sm">{time}</p>
      <div className="flex flex-row justify-between justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <div className="my-3">
            <Like className="w-6 h-6 text-[#FF5168]" />
            <p className="font-kbogothicmedium text-gray-600 text-sm">공감</p>
          </div>
          <p className="font-kbogothiclight text-gray-600 ml-5 hover:cursor-pointer" onClick={() => nav(`/commuhome/freedetail/${boardId}`)}>{content}</p>
        </div>
        <Trash className="w-4 h-4 hover:cursor-pointer text-gray-400" onClick={() => setShow(true)} />
      </div>
      {show && <Dialog title="삭제 요청" body="나의 활동을 정말 삭제하시겠습니까?" yesButton={yesRemove} noButton={noRemove} />}
    </div>
  );
};

export default MyActiveLike;
