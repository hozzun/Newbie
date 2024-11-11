import Like from "../../assets/icons/heart-solid.svg?react";
import View from "../../assets/icons/eye-solid.svg?react";
import Comment from "../../assets/icons/comment-solid.svg?react";

interface CommuFreeItemProps {
  title: string;
  contents: string;
  writer: string;
  createTimeStamp: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

const CommuFreeItem = ({
  title,
  contents,
  writer,
  createTimeStamp,
  viewCount,
  likeCount,
  commentCount,
}: CommuFreeItemProps) => {
  return (
    <>
      <div>
        <div className="font-kbogothicmedium text-xl">{title}</div>
        <div className="font-kbogothiclight text-lg">{contents}</div>
        <div className="flex justify-between items-center">
          <div className="font-kbogothiclight text-xs">{writer}</div>
          <div className="font-kbogothiclight text-xs">{createTimeStamp}</div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div className="flex gap-1 font-kbogothiclight text-base">
            <View className="w-4 h-4" /> {viewCount}
          </div>
          <div className="flex gap-1 font-kbogothiclight text-base">
            <Like className="w-4 h-4 text-[#FF5168]" /> {likeCount}
          </div>
          <div className="flex gap-1 font-kbogothiclight text-base">
            <Comment className="w-4 h-4 text-[#7FAAFF]" /> {commentCount}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommuFreeItem;
