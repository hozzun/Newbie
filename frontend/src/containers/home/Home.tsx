import { useState, useEffect } from "react";
import HomeComponent from "../../components/home/Home";
import {
  Game,
  GameSituation,
  GameAboutCheeringClub,
  TodayGameProps,
} from "../../components/home/TodayGame";

const Home = () => {
  const [hasCheeringClub, setHasCheeringClub] = useState<boolean>(false);
  const [todayGame, setTodayGame] = useState<GameAboutCheeringClub>();

  const fetchTodayGame = async () => {
    try {
      // TODO: GET - 응원 구단 여부
      const hasCheeringClubData: boolean = true;
      setHasCheeringClub(hasCheeringClubData);

      if (hasCheeringClubData) {
        // TODO: GET - 응원 구단에 맞는 오늘의 경기
        const gameData: Game = {
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

        // TODO: GET - 경기 진행 상황
        const gameSituationData: GameSituation = {
          isPlaying: true,
          scores: {
            samsung: 2,
            kia: 1,
          },
        };

        const todayGameData: GameAboutCheeringClub = {
          game: gameData,
          gameSituation: gameSituationData,
        };
        setTodayGame(todayGameData);
      }
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
    hasCheeringClub,
    todayGame,
    goMore,
  };

  return <HomeComponent todayGameProps={todayGameProps} />;
};

export default Home;
