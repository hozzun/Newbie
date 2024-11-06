import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";
import clubs from "../home/clubs";

const ClubOverview = () => {
  return (
    <div className="flex flex-col w-full justify-center items-start">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col">
          <p className="text-2xl font-kbogothicbold text-white">SSG 랜더스</p>
          <Button className="text-xs mt-1.5" variant={BUTTON_VARIANTS.white}>
            나의 구단 등록하기
          </Button>
        </div>
        <img src={clubs["ssg"].imgSrc} alt="ssg logo" className="w-28 h-28" />
      </div>
      <p className="text-lg font-kbogothicbold text-white mt-6">2024 시즌 6위</p>
      <div className="flex flex-row space-x-1">
        <div className="flex flex-row">
          <p className="text-sm font-kbogothiclight text-white mr-1">경기 수</p>
          <p className="text-sm font-kbogothicmedium text-white">114</p>
        </div>
        <p className="text-sm font-kbogothiclight text-white"> | </p>
        <div className="flex flex-row">
          <p className="text-sm font-kbogothiclight text-white mr-1">성적</p>
          <p className="text-sm font-kbogothicmedium text-white">72승 2무 70패</p>
        </div>
        <p className="text-sm font-kbogothiclight text-white"> | </p>
        <div className="flex flex-row">
          <p className="text-sm font-kbogothiclight text-white mr-1">승률</p>
          <p className="text-sm font-kbogothicmedium text-white">0.507</p>
        </div>
      </div>
    </div>
  );
};

export default ClubOverview;
