import { useState, useEffect } from "react";
import HomeComponent from "../../components/home/Home";
import { Game, GameSituation, TodayGame, TodayGameProps } from "../../components/home/TodayGame";

const Home = () => {
  const [todayGame, setTodayGame] = useState<TodayGame>({
    hasCheeringClub: false,
  });

  const fetchTodayGame = async () => {
    try {
      // TODO: GET - 응원 구단 여부
      const hasCheeringClub: boolean = true;
      const todayGameData: TodayGame = {
        hasCheeringClub,
      };

      if (hasCheeringClub) {
        // TODO: GET - 응원 구단에 맞는 오늘의 경기
        const game: Game = {
          time: "17:00",
          place: "광주스타디움",
          clubs: [
            {
              id: "samsung",
              player: "이재익",
            },
            {
              id: "kia",
              player: "곽도규",
            },
          ],
        };
        todayGameData.game = game;

        // TODO: GET - 경기 진행 상황
        const gameSituation: GameSituation = {
          isPlaying: true,
          scores: {
            samsung: 2,
            kia: 1,
          },
        };
        todayGameData.gameSituation = gameSituation;
      }

      setTodayGame(todayGameData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTodayGame();
  }, []);

  const goMore = () => {
    // TODO: MOVE - 경기 일정 페이지
    console.log("경기 일정 페이지로 이동");
  };

  const todayGameProps: TodayGameProps = {
    ...todayGame,
    goMore,
  };

  return <HomeComponent todayGameProps={todayGameProps} />;
};

export default Home;
