import { useEffect, useRef, useState } from "react";
import GameScheduleComponent from "../../components/home/GameSchedule";
import { GameInfo, GameProps, GameSituation } from "./Home";
import { GetGamesRequest, getGames } from "../../api/baseballApi";
import { getClubIdByNum } from "../../util/ClubId";
import { GetWeatherRequest, getWeather } from "../../api/weatherApi";
import Stadiums from "../../util/Stadiums";
import { calculateWeather } from "../../util/Weather";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { decrementDate, incrementDate } from "../../redux/gameSlice";
import { RootState } from "../../redux/store";
import { getKoreanDate } from "../../util/getKoreanDate";

const GameSchedule = () => {
  const dispatch = useDispatch();

  const currentDateWithoutTime = useSelector((state: RootState) => state.game.currentDate);
  const currentDate = new Date(currentDateWithoutTime);

  const prevDateRef = useRef<Date | null>(null);

  const today = new Date();
  const [games, setGames] = useState<Array<GameProps> | null>(null);

  const fetchGames = async () => {
    const todayWithoutTime = getKoreanDate(today);

    try {
      // 경기 정보 가져오기
      const getGamesRequest: GetGamesRequest = {
        year: currentDate.getFullYear().toString(),
        month: (currentDate.getMonth() + 1).toString().padStart(2, "0"),
        day: currentDate.getDate().toString().padStart(2, "0"),
      };
      const response = await getGames(getGamesRequest);
      if (currentDateWithoutTime < todayWithoutTime) {
        // 과거 경기 정보
        const gameDatas: Array<GameProps> = response.data.map(d => {
          const homeClubId = getClubIdByNum(d.homeTeamId);
          const awayClubId = getClubIdByNum(d.awayTeamId);

          return {
            gameInfo: {
              id: d.id,
              day: d.date,
              time: d.time,
              place: d.stadium,
              clubs: [
                {
                  id: homeClubId,
                  player: d.homeStartingPitcher,
                },
                {
                  id: awayClubId,
                  player: d.awayStartingPitcher,
                },
              ],
            },
            gameSituation: {
              isPlaying: false,
              scores: {
                [homeClubId]: d.homeScore,
                [awayClubId]: d.awayScore,
              },
            },
          };
        });

        setGames(gameDatas);
      } else if (currentDateWithoutTime == todayWithoutTime) {
        // 오늘 경기 정보
        const gameInfoDatas: Array<GameInfo> = response.data.map(d => {
          const homeClubId = getClubIdByNum(d.homeTeamId);
          const awayClubId = getClubIdByNum(d.awayTeamId);

          return {
            id: d.id,
            day: d.date,
            time: d.time,
            place: d.stadium,
            clubs: [
              {
                id: homeClubId,
                player: d.homeStartingPitcher,
              },
              {
                id: awayClubId,
                player: d.awayStartingPitcher,
              },
            ],
          };
        });

        // 구장 기준 날씨 정보 가져오기
        for (const gameInfoData of gameInfoDatas) {
          const getWeatherRequest: GetWeatherRequest = {
            nx: Stadiums[gameInfoData.place].logitude,
            ny: Stadiums[gameInfoData.place].latitude,
          };
          const responseAboutWeather = await getWeather(getWeatherRequest);
          const items = responseAboutWeather.data.response.body.items.item;
          gameInfoData.weather = calculateWeather(items);
        }

        // TODO: GET - 경기 진행 상황
        const gameSituationDatas: Array<GameSituation> = gameInfoDatas.map(gameInfoData => {
          const homeClubId = gameInfoData.clubs[0].id;
          const awayClubId = gameInfoData.clubs[1].id;

          return {
            isPlaying: true,
            scores: {
              [homeClubId]: 2,
              [awayClubId]: 1,
            },
          };
        });

        const gameDatas = gameInfoDatas.map((gameInfoData, index) => ({
          gameInfo: gameInfoData,
          gameSituation: gameSituationDatas[index],
        }));

        setGames(gameDatas);
      } else {
        // 미래 경기 정보
        const gameDatas: Array<GameProps> = response.data.map(d => {
          const homeClubId = getClubIdByNum(d.homeTeamId);
          const awayClubId = getClubIdByNum(d.awayTeamId);

          return {
            gameInfo: {
              id: d.id,
              day: d.date,
              time: d.time,
              place: d.stadium,
              clubs: [
                {
                  id: homeClubId,
                  player: d.homeStartingPitcher,
                },
                {
                  id: awayClubId,
                  player: d.awayStartingPitcher,
                },
              ],
            },
            gameSituation: {
              isPlaying: false,
            },
          };
        });

        setGames(gameDatas);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[ERROR] 경기 정보 없음 by game schedule");
        setGames([]);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (!prevDateRef.current || currentDate.getTime() !== prevDateRef.current.getTime()) {
      fetchGames();
      prevDateRef.current = currentDate;
    }
  }, [currentDate]);

  const goPreviousDay = () => {
    dispatch(decrementDate());
  };

  const goNextDay = () => {
    dispatch(incrementDate());
  };

  return (
    <GameScheduleComponent
      day={getKoreanDate(currentDate)}
      games={games}
      goPreviousDay={goPreviousDay}
      goNextDay={goNextDay}
    />
  );
};

export default GameSchedule;
