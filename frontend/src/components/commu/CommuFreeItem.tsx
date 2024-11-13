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
        <div className="font-kbogothicmedium text-lg">{title}</div>
        <div className="font-kbogothiclight text-sm py-2">{contents}</div>
        <div className="flex justify-between items-center pb-1">
          <div className="font-kbogothiclight text-xs">{writer}</div>
          <div className="font-kbogothiclight text-xs">{createTimeStamp}</div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div className="flex justify-end items-center gap-1 font-kbogothiclight text-xs">
            <View className="w-4 h-4" /> {viewCount}
          </div>
          <div className="flex gap-1 justify-end items-center font-kbogothiclight text-xs">
            <Like className="w-4 h-4 text-[#FF5168]" /> {likeCount}
          </div>
          <div className="flex gap-1 justify-end items-center font-kbogothiclight text-xs">
            <Comment className="w-4 h-4 text-[#7FAAFF]" /> {commentCount}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommuFreeItem;
