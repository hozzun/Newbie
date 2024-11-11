import Like from "../../assets/icons/heart-solid.svg?react";
import View from "../../assets/icons/eye-solid.svg?react";
import Comment from "../../assets/icons/comment-solid.svg?react";

const CommuFreeItem = () => {
  return (
    <>
      <div>
        <div className="font-kbogothicmedium text-xl">title</div>
        <div className="font-kbogothiclight text-lg">contents</div>
        <div className="flex justify-between items-center">
          <div className="font-kbogothiclight text-base">writer</div>
          <div className="font-kbogothiclight text-base">createTimeStamp</div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div className="flex gap-1 font-kbogothiclight text-base">
            <Like className="w-4 h-4" /> 조회수 수
          </div>
          <div className="flex gap-1 font-kbogothiclight text-base">
            <View className="w-4 h-4" /> 좋아요 수
          </div>
          <div className="flex gap-1 font-kbogothiclight text-base">
            <Comment className="w-4 h-4" /> 코멘트 수
          </div>
        </div>
      </div>
    </>
  );
};

export default CommuFreeItem;
