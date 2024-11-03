import ClubRank, { ClubRankProps } from "./ClubRank";
import ImageCard, { ImageCardProps } from "./ImageCard";
import TodayGame, { TodayGameProps } from "./TodayGame";

interface HomeProps {
  todayGameProps: TodayGameProps;
  imageCardProps: ImageCardProps;
  clubRankProps: ClubRankProps;
}

const Home = (props: HomeProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <TodayGame {...props.todayGameProps} />
      <ImageCard {...props.imageCardProps} />
      <ClubRank {...props.clubRankProps} />
    </div>
  );
};

export default Home;
