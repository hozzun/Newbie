import Coin from "../../assets/icons/copyright-solid.svg?react";
import Location from "../../assets/icons/marker-solid.svg?react";
import Like from "../../assets/icons/heart-solid.svg?react";
import Comment from "../../assets/icons/comment-solid.svg?react";

interface CommuTradeItemProps {
  title: string;
  contents: string;
  writer: string;
  createTimeStamp: string;
  price: number;
  location: string;
  viewCount: number;
  commentCount: number;
  imageUrl: string;
}

const CommuTrade = ({
  title,
  contents,
  writer,
  createTimeStamp,
  price,
  location,
  viewCount,
  commentCount,
  imageUrl,
}: CommuTradeItemProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="flex items-start font-kbogothicmedium text-lg">{title}</div>
          <div className="font-kbogothiclight text-sm py-2">{contents}</div>
        </div>
        <div className="ml-4">
          <img src={imageUrl} alt={`${title} 이미지`} className="w-20 h-20 object-cover rounded-md" />
        </div>
      </div>
      <div className="flex justify-between items-center pb-1">
        <div className="font-kbogothiclight text-xs">{writer}</div>
        <div className="font-kbogothiclight text-xs">{createTimeStamp}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <div className="flex gap-1 font-kbogothiclight text-xs">
            <Coin className="w-4 h-4 text-[#FFA600]" /> {price}
          </div>
          <div className="flex gap-1 font-kbogothiclight text-xs">
            <Location className="w-4 h-4 text-[#FFAEC5]" /> {location}
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div className="flex gap-1 font-kbogothiclight text-xs">
            <Like className="w-4 h-4" /> {viewCount}
          </div>
          <div className="flex gap-1 font-kbogothiclight text-xs">
            <Comment className="w-4 h-4 text-[#7FAAFF]" /> {commentCount}
          </div>
        </div>
      </div>
    </div>
  );
};

const DummyData = {
  title: "한화 수리",
  contents: "더 귀여운 수리를 찾아서 보냅니다.",
  writer: "immiryang",
  createTimeStamp: "2024-11-18 16:30",
  price: 10000,
  location: "서울특별시 강남구",
  viewCount: 120,
  commentCount: 0,
  imageUrl: "https://newbie-mp3-bucket.s3.ap-northeast-2.amazonaws.com/profile/default/default.jpg",
};

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <CommuTrade {...DummyData} />
    </div>
  );
};

export default App;
