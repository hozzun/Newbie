import Coin from "../../assets/icons/copyright-solid.svg?react";
import Location from "../../assets/icons/marker-solid.svg?react";
import Comment from "../../assets/icons/comment-solid.svg?react";
import View from "../../assets/icons/eye-solid.svg?react";
import EmblaCarousel from "../../components/common/EmblaCarousel";

const CommuTradeDetail = () => {
  const slides = ["/karina.jpg", "/karina.jpg", "/karina.jpg"];

  return (
    <>
      <section className="font-kbogothiclight">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">유저사진</div>
            <div>
              <div className="font-kbogothicmedium">개복이</div>
              <div className="text-sm text-gray-300">13분 전</div>
            </div>
          </div>
          <div className="text-right text-red-500 cursor-pointer">신고</div>
        </div>
        <div className="font-kbogothicmedium py-4">타이거즈 굿즈 판매</div>
        <div className="flex gap-2 pb-2">
          <div className="flex gap-1 items-center">
            <Coin className="w-4 h-4 text-[#FFA600]" />
            <div>5,000원</div>
          </div>
          <div className="flex gap-1 items-center">
            <Location className="w-4 h-4 text-[#FFAEC5]" />
            <div>대전 광역시 유성구</div>
          </div>
        </div>
        <div>
          <EmblaCarousel slides={slides} />
        </div>
        <div className="py-4">
          응원하는 구단을 바꾸어서 팔아요..
          <br />
          정말 고이 모셔놓고 만지지 않아서 깨끗해요
        </div>
        <div className="flex justify-end gap-1 items-center mb-2">
          <View className="w-4 h-4" />
          <div className="text-xs">12명이 봤어요.</div>
        </div>
        <div className="border-b-2 text-gray-100 mb-2"></div>
      </section>

      <section className="font-kbogothiclight">
        <div className="font-kbogothicmedium pt-2 pb-4">댓글 1</div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">유저사진</div>
            <div>
              <div className="font-kbogothicmedium">천재칼치</div>
              <div className="text-sm text-gray-300">13분 전</div>
            </div>
          </div>
        </div>
        <div className="py-2 ml-16">
          오늘은 이 글을 읽으면서 많은 동기부여를 받았어요. 고맙습니다!
        </div>
        <div className="flex justify-between items-center ml-16">
          <div className="flex items-center">
            <Comment className="w-4 h-4 text-[#7FAAFF] mr-2" />
            <div>답글 쓰기</div>
          </div>
          <div className="text-right text-gray-300 cursor-pointer">신고하기</div>
        </div>
      </section>
    </>
  );
};

export default CommuTradeDetail;
