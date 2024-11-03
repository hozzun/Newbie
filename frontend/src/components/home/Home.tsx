import CardStore, { CardStoreProps } from "./CardStore";
import ClubRank, { ClubRankProps } from "./ClubRank";
import Highlight, { HighlightProps } from "./Highlight";
import ImageCard, { ImageCardProps } from "./ImageCard";
import TodayGame, { TodayGameProps } from "./TodayGame";

interface HomeProps {
  todayGameProps: TodayGameProps;
  imageCardProps: ImageCardProps;
  clubRankProps: ClubRankProps;
  highlightProps: HighlightProps;
  cardStoreProps: CardStoreProps;
}

const Home = (props: HomeProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <TodayGame {...props.todayGameProps} />
      <ImageCard {...props.imageCardProps} />
      <ClubRank {...props.clubRankProps} />
      <Highlight {...props.highlightProps} />
      <CardStore {...props.cardStoreProps} />
    </div>
  );
};

export default Home;
