import Like from "../../assets/icons/heart-solid.svg?react";
import Trash from "../../assets/icons/trash.svg?react";

interface LikeProps {
  time: string;
  title: string;
  onClick: () => void;
}

const MyActiveLike = ({ time, title, onClick }: LikeProps) => {
  return (
    <div className="flex flex-col m-3">
      <p className="font-kbogothicmedium text-gray-600 text-sm">{time}</p>
      <div className="flex flex-row justify-between justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <div className="my-3">
            <Like className="w-6 h-6 text-[#FF5168]" />
            <p className="font-kbogothicmedium text-gray-600 text-sm">공감</p>
          </div>
          <p className="font-kbogothicmedium text-gray-600 ml-5">{title}</p>
          <p className="font-kbogothiclight text-gray-600 ml-2">글에 공감합니다.</p>
        </div>
        <div onClick={onClick}>
          <Trash className="w-4 h-4 hover:cursor-pointer text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default MyActiveLike;
