import Coin from "../../assets/icons/copyright-solid.svg?react";
import SortSelectBox from "../common/SortSelectBox";
import PhotoCard from "./PhotoCard";
import TabBar from "./TabBar";

const options: Array<string> = ["가나다순", "최신순", "판매순", "가격낮은순", "가격높은순"];

const photoCardData = {
  id: "1",
  title: "카리나",
  imgSrc: "이미지 URL",
  price: 5000,
};

const onClick = () => {
  // TODO: MOVE - 카드 상세조회 페이지
  console.log("카드 상세조회 페이지로 이동");
};

const CardStore = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">스토어</p>
        <div className="flex flex-row items-center">
          <Coin className="text-warning w-4 h-4 mr-2" />
          <p className="text-base font-kbogothicmedium text-gray-700">3,000</p>
        </div>
      </div>
      <TabBar />
      <div className="flex flex-row justify-between items-center w-full mt-3">
        <p className="text-base font-kbogothicmedium text-gray-700">총 6개</p>
        <SortSelectBox options={options} minWidth={100} />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-3">
        <PhotoCard photoCard={photoCardData} onClick={onClick} />
        <PhotoCard photoCard={photoCardData} onClick={onClick} />
        <PhotoCard photoCard={photoCardData} onClick={onClick} />
        <PhotoCard photoCard={photoCardData} onClick={onClick} />
        <PhotoCard photoCard={photoCardData} onClick={onClick} />
        <PhotoCard photoCard={photoCardData} onClick={onClick} />
      </div>
    </div>
  );
};

export default CardStore;
