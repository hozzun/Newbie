import ImageCard, { ImageCardProps } from "./ImageCard";
import TodayGame, { TodayGameProps } from "./TodayGame";

interface HomeProps {
  todayGameProps: TodayGameProps;
  imageCardProps: ImageCardProps;
}

const Home = (props: HomeProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <TodayGame {...props.todayGameProps} />
      <ImageCard {...props.imageCardProps} />
    </div>
  );
};

export default Home;
