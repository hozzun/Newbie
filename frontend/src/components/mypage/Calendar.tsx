import axios from "axios";
import CalenderIcon from "../../assets/icons/calender.svg?react";
import { useState, useEffect } from 'react';
import ClubLogos from "../../util/ClubLogos";
import { getClubIdByNum } from "../../util/ClubId";

interface Game {
  date: string;
  homTeamId: number;
  awayTeamId: number;
  stadium: string;
}

const Calendar = () => {
  const [games, setGames] = useState<Game[]>([]);
  const year = new Date().getFullYear();
  const month = 8; // 9월로 고정(현재 경기 없음 이슈)
  const myTeamId = 1; // 내가 응원하는 팀 ID
  
  const getGameInfo = async () => {
    const api_url = import.meta.env.VITE_GAME_INFO;

    try {
      const response = await axios.get(api_url, {
        params: {
          year: year.toString(),
          month: "09",
          teamId: myTeamId
        }
      });
      setGames(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getGameInfo();
  }, []);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 날짜 배열 만들기
  const dates = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push(new Date(year, month, i));
  }

  // 특정 날짜에 경기 정보가 있는지 확인하는 함수
  const getGameForDate = (date: Date): Game | undefined => {
    return games.find(game => new Date(game.date).getDate() === date.getDate());
  };

  return (
    <>
      <div className="flex flex-row">
        <CalenderIcon className="w-6 h-6 ml-5 text-gray-200" />
        <p className="font-kbogothicbold text-gray-600 ml-3">경기 일정</p>
      </div>
      <div className="m-5 p-5 bg-gray-100 rounded-2xl">
        <div className="flex flex-row justify-between">
          <p className="font-kbogothicbold text-lg mb-5">
            {year}년 9월
          </p>
          <div className="flex flex-row items-center">
            <div className="w-2.5 h-2.5 bg-green-900 rounded-full mr-2"></div>
            <p className="font-kbogothicmedium text-xs mr-2">홈 경기</p>
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-full mr-2"></div>
            <p className="font-kbogothicmedium text-xs mr-2">원정 경기</p>
          </div>
        </div>
  
        {/* 요일 표시 */}
        <div className="grid grid-cols-7 text-center mb-5 font-kbogothicbold">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
  
        {/* 날짜 표시 */}
        <div className="grid grid-cols-7 text-center font-kbogothicmedium text-gray-600">
          {/* 첫 주 앞쪽 공백 채우기 */}
          {Array.from({ length: firstDay.getDay() }).map((_, i) => (
            <div key={i}></div>
          ))}
  
          {/* 날짜 표시 */}
          {dates.map((date) => {
            const game = getGameForDate(date);
            console.log(game)

            if (!game) {
              return (
                <div key={date.getDate()} className="flex flex-col p-2 m-2 rounded-lg text-[8px] bg-white">
                  <div className="flex justify-end">{date.getDate()}</div>
                </div>
              );
            }

            const isHomeGame = game.homTeamId == myTeamId;
            
            const opponentTeamId = isHomeGame ? game.awayTeamId : game.homTeamId;
            const opponentTeamName = getClubIdByNum(opponentTeamId);

            return (
              <div
                key={date.getDate()}
                className={`flex flex-col p-2 m-1 rounded-2xl text-[7px] bg-white ${
                  isHomeGame ? "border-2 border-green-900" : "border-2 border-gray-300"
                }`}
              >
                <div className="flex justify-end">{date.getDate()}</div>
                
                {/* 경기 정보가 있는 경우 */}
                {opponentTeamName && (
                  <>
                    <img
                      className="flex justify-center items-center mb-1 h-5"
                      src={ClubLogos[opponentTeamName]}
                      alt={`${opponentTeamName} logo`}
                    />
                    <p>{game.stadium}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Calendar;
