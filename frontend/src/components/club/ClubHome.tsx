import { ClubCarouselProps } from "../common/ClubCarousel";
import ClubOverview, { ClubOverviewProps } from "./ClubOverview";
import ClubRankHistory, { ClubRankHistoryProps } from "./ClubRankHistory";
import ClubRecord from "./ClubRecord";
import { ClubRecordItemProps } from "./ClubRecordItem";
import OtherClubs from "./OtherClubs";
import PlayerList, { PlayerListProps } from "./PlayerList";
import UpcomingGame, { UpcomingGameProps } from "./UpcomingGame";

interface ClubHomeProps {
  clubOverviewProps: ClubOverviewProps;
  clubRecordItems: Array<ClubRecordItemProps> | null;
  upcomingGameProps: UpcomingGameProps;
  playerListProps: PlayerListProps;
  clubRankHistoryProps: ClubRankHistoryProps;
  clubCarouselProps: ClubCarouselProps;
}

const clubColors: Record<string, string> = {
  kia: "bg-club-kia",
  samsung: "bg-club-samsung",
  lg: "bg-club-lg",
  doosan: "bg-club-doosan",
  kt: "bg-club-kt",
  ssg: "bg-club-ssg",
  lotte: "bg-club-lotte",
  hanwha: "bg-club-hanwha",
  nc: "bg-club-nc",
  kiwoom: "bg-club-kiwoom",
};

const ClubHome = (props: ClubHomeProps) => {
  const clubHomeClass = props.clubOverviewProps.clubOverviewData
    ? `${clubColors[props.clubOverviewProps.clubOverviewData.id]} w-full max-w-[600px] min-w-[320px] mx-auto pt-4`
    : "bg-gray-300 w-full max-w-[600px] min-w-[320px] mx-auto pt-4";

  return (
    <div className={clubHomeClass}>
      <ClubOverview {...props.clubOverviewProps} />
      <div className="bg-white w-full rounded-t-2xl pt-6 px-4 mt-6 pb-32">
        <ClubRecord items={props.clubRecordItems} />
        <UpcomingGame {...props.upcomingGameProps} />
        <ClubRankHistory {...props.clubRankHistoryProps} />
        <PlayerList {...props.playerListProps} />
        <OtherClubs {...props.clubCarouselProps} />
      </div>
    </div>
  );
};

export default ClubHome;
