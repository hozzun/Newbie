import Coin from "../../assets/icons/copyright-solid.svg?react";
import { PhotoCardInfo } from "../../containers/cardstore/CardStore";
import SortSelectBox from "../common/SortSelectBox";
import Checkbox from "./Checkbox";
import PhotoCard from "../../containers/cardstore/PhotoCard";
import TabBar from "./TabBar";

interface CardStoreProps {
  selectedPositionOption: string;
  handleSelectPositionOption: (value: string) => void;
  selectedSortOption: string;
  handleSelectSortOption: (value: string) => void;
  isVisibleBoughtCard: boolean;
  handleIsVisibleBoughtCard: () => void;
  photoCardInfos: Array<PhotoCardInfo> | null;
}

const tabBarOptions: Array<string> = ["투수", "내야수", "외야수", "포수"];
const sortOptions: Array<string> = ["가나다순", "최신순", "판매순", "가격낮은순", "가격높은순"];

const CardStore = (props: CardStoreProps) => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-row justify-end items-center w-full">
        <div className="flex flex-row items-center">
          <Coin className="text-warning w-4 h-4 mr-2" />
          <p className="text-base font-kbogothicmedium text-gray-700">3,000</p>
        </div>
      </div>
      <TabBar
        className="mt-8"
        options={tabBarOptions}
        selectedOption={props.selectedPositionOption}
        handleSelectOption={props.handleSelectPositionOption}
      />
      <div className="flex flex-row justify-between items-center w-full mt-3">
        <p className="text-base font-kbogothicmedium text-gray-700">
          총 {props.photoCardInfos ? props.photoCardInfos.length : 0}개
        </p>
        <div className="flex flex-row justify-end items-center">
          <SortSelectBox
            options={sortOptions}
            minWidth={100}
            selectedSortOption={props.selectedSortOption}
            handleSelectSortOption={props.handleSelectSortOption}
          />
          <Checkbox
            className="ml-1"
            label="구매한 카드 미포함"
            checked={!props.isVisibleBoughtCard}
            handleChecked={props.handleIsVisibleBoughtCard}
          />
        </div>
      </div>
      {props.photoCardInfos ? (
        <div className="grid grid-cols-3 gap-4 mt-3">
          {props.photoCardInfos.map(photoCardInfo => (
            <PhotoCard key={photoCardInfo.id} photoCardInfo={photoCardInfo} />
          ))}
        </div>
      ) : (
        <p className="text-base font-kbogothicmedium text-gray-700">
          선수 포토 카드가 없습니다...😥
        </p>
      )}
    </div>
  );
};

export default CardStore;
