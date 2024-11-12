import { ClubOverviewData } from "../../containers/club/ClubHome";
import ClubFullName from "../../util/ClubFullName";
import ClubLogos from "../../util/ClubLogos";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";

export interface ClubOverviewProps {
  clubOverviewData: ClubOverviewData | null;
  isVisibleButton: boolean;
  handleRegisterCheerClub: () => void;
}

const ClubOverview = (props: ClubOverviewProps) => {
  if (!props.clubOverviewData) {
    return (
      <div className="flex w-full justify-center items-center px-4">
        <p className="text-base font-kbogothicmedium text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full justify-center items-start px-4">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex flex-col">
          <p className="text-2xl font-kbogothicbold text-white">
            {ClubFullName[props.clubOverviewData.id]}
          </p>
          {props.isVisibleButton && (
            <Button
              className="text-xs mt-1.5"
              variant={BUTTON_VARIANTS.white}
              onClick={props.handleRegisterCheerClub}
            >
              나의 구단 등록하기
            </Button>
          )}
        </div>
        <img src={ClubLogos[props.clubOverviewData.id]} alt="ssg logo" className="w-28 h-28" />
      </div>
      <p className="text-lg font-kbogothicbold text-white mt-6">{`${props.clubOverviewData.year} 시즌 ${props.clubOverviewData.rank}위`}</p>
      <div className="flex flex-row space-x-1">
        <div className="flex flex-row">
          <p className="text-sm font-kbogothiclight text-white mr-1">경기 수</p>
          <p className="text-sm font-kbogothicmedium text-white">
            {props.clubOverviewData.gameCount}
          </p>
        </div>
        <p className="text-sm font-kbogothiclight text-white"> | </p>
        <div className="flex flex-row">
          <p className="text-sm font-kbogothiclight text-white mr-1">성적</p>
          <p className="text-sm font-kbogothicmedium text-white">{`${props.clubOverviewData.winCount}승 ${props.clubOverviewData.drawCount}무 ${props.clubOverviewData.loseCount}패`}</p>
        </div>
        <p className="text-sm font-kbogothiclight text-white"> | </p>
        <div className="flex flex-row">
          <p className="text-sm font-kbogothiclight text-white mr-1">승률</p>
          <p className="text-sm font-kbogothicmedium text-white">
            {props.clubOverviewData.winRate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubOverview;
