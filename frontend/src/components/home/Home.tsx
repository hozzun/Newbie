import TodayGame, { TodayGameProps } from "./TodayGame";

interface HomeProps {
  todayGameProps: TodayGameProps;
}

const Home = (props: HomeProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <TodayGame {...props.todayGameProps} />
    </div>
  );
};

export default Home;
