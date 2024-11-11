import Coin from "../../assets/icons/copyright-solid.svg?react";
import Location from "../../assets/icons/marker-solid.svg?react";
import Like from "../../assets/icons/heart-solid.svg?react";
import Comment from "../../assets/icons/comment-solid.svg?react";

const CommuTrade = () => {
  return (
    <>
      <div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="font-kbogothicmedium text-xl">title</div>
            <div className="font-kbogothiclight text-lg">contents</div>
          </div>
          <div className="ml-4">
            <img src="image_url_here" alt="image description" className="w-20 h-20 object-cover" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-kbogothiclight text-base">writer</div>
          <div className="font-kbogothiclight text-base">createTimeStamp</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <div className="flex gap-1 font-kbogothiclight text-base">
              <Coin className="w-4 h-4 text-[#FFA600]" /> 가격
            </div>
            <div className="flex gap-1 font-kbogothiclight text-base">
              <Location className="w-4 h-4 text-[#FFAEC5]" /> 지역
            </div>
          </div>
          <div className="flex justify-end items-center gap-2">
            <div className="flex gap-1 font-kbogothiclight text-base">
              <Like className="w-4 h-4" /> 조회수 수
            </div>
            <div className="flex gap-1 font-kbogothiclight text-base">
              <Comment className="w-4 h-4 text-[#7FAAFF]" /> 코멘트 수
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommuTrade;
