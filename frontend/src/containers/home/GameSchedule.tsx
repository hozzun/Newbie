import { useEffect, useState } from "react";
import GameScheduleComponent from "../../components/home/GameSchedule";
import { GameProps, GameSituation } from "../../components/home/Game";
import { GameInfo } from "./Home";

const GameSchedule = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [games, setGames] = useState<Array<GameProps> | null>(null);

  const fetchGames = async () => {
    const todayWithoutHour = today.toISOString().split("T")[0];
    const currentDateWithoutHour = currentDate.toISOString().split("T")[0];

    try {
      // 경기 정보 가져오기
      if (currentDateWithoutHour < todayWithoutHour) {
        // TODO: GET - 과거 경기 정보
        const gamesData: Array<GameProps> = [
          {
            gameInfo: {
              day: "2024-11-03",
              time: "17:00",
              place: "광주스타디움",
              clubs: [
                {
                  id: "samsung",
                },
                {
                  id: "kia",
                },
              ],
            },
            gameSituation: {
              isPlaying: false,
              scores: {
                samsung: 2,
                kia: 1,
              },
            },
          },
          {
            gameInfo: {
              day: "2024-11-03",
              time: "17:00",
              place: "광주스타디움",
              clubs: [
                {
                  id: "samsung",
                },
                {
                  id: "kia",
                },
              ],
            },
            gameSituation: {
              isPlaying: false,
              scores: {
                samsung: 2,
                kia: 1,
              },
            },
          },
          {
            gameInfo: {
              day: "2024-11-03",
              time: "17:00",
              place: "광주스타디움",
              clubs: [
                {
                  id: "samsung",
                },
                {
                  id: "kia",
                },
              ],
            },
            gameSituation: {
              isPlaying: false,
              scores: {
                samsung: 2,
                kia: 1,
              },
            },
          },
          {
            gameInfo: {
              day: "2024-11-03",
              time: "17:00",
              place: "광주스타디움",
              clubs: [
                {
                  id: "samsung",
                },
                {
                  id: "kia",
                },
              ],
            },
            gameSituation: {
              isPlaying: false,
              scores: {
                samsung: 2,
                kia: 1,
              },
            },
          },
          {
            gameInfo: {
              day: "2024-11-03",
              time: "17:00",
              place: "광주스타디움",
              clubs: [
                {
                  id: "samsung",
                },
                {
                  id: "kia",
                },
              ],
            },
            gameSituation: {
              isPlaying: false,
              scores: {
                samsung: 2,
                kia: 1,
              },
            },
          },
        ];

        setGames(gamesData);
      } else if (currentDateWithoutHour == todayWithoutHour) {
        // 오늘 경기 정보
        // TODO: GET - 응원 구단에 맞는 오늘의 경기
        const gameInfoData: GameInfo = {
          day: "2024-11-05",
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

        // TODO: GET - 날씨 정보
        gameInfoData.weather = "☀ 맑음";

        // TODO: GET - 경기 진행 상황
        const gameSituationData: GameSituation = {
          isPlaying: true,
          scores: {
            samsung: 2,
            kia: 1,
          },
        };

        const gameData: GameProps = {
          gameInfo: gameInfoData,
          gameSituation: gameSituationData,
        };

        const gamesData: Array<GameProps> = [];
        gamesData.push(gameData);

        setGames(gamesData);
      } else {
        // TODO: GET - 미래 경기 정보
        const gamesData: Array<GameProps> = [
          {
            gameInfo: {
              day: "2024-11-05",
              time: "17:00",
              place: "광주스타디움",
              clubs: [
                {
                  id: "samsung",
                },
                {
                  id: "kia",
                },
              ],
            },
            gameSituation: {
              isPlaying: false,
            },
          },

          {
            gameInfo: {
              day: "2024-11-05",
              time: "17:00",
              place: "광주스타디움",
              clubs: [
                {
                  id: "samsung",
                },
                {
                  id: "kia",
                },
              ],
            },
            gameSituation: {
              isPlaying: false,
            },
          },
        ];

        setGames(gamesData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [currentDate]);

  const goPreviousDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const goNextDay = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  return (
    <GameScheduleComponent
      day={currentDate.toISOString().split("T")[0]}
      games={games}
      goPreviousDay={goPreviousDay}
      goNextDay={goNextDay}
    />
  );
};

export default GameSchedule;
