import axiosInstance from "../../util/axiosInstance";
import CalenderIcon from "../../assets/icons/calender.svg?react";
import { useState, useEffect } from "react";
import ClubLogos from "../../util/ClubLogos";
import { getClubIdByNum } from "../../util/ClubId";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Game {
  date: string;
  homeTeamId: number;
  awayTeamId: number;
  stadium: string;
}

const Calendar = () => {
  // TODO: 월 데이터 수정
  const [games, setGames] = useState<Game[]>([]);
  const year = new Date().getFullYear();
  const month = 8; // 9월로 고정(현재 경기 없음 이슈)
  const formattedMonth = month.toString().padStart(2, "0");
  const { team } = useSelector((state: RootState) => state.team);

  const getGameInfo = async () => {
    const params = {
      year: year.toString(),
      month: formattedMonth,
      teamId: team,
    };

    try {
      const response = await axiosInstance.get("/api-baseball/games", { params });
      setGames(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getGameInfo();
  }, []);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
          <p className="font-kbogothicbold text-lg mb-5">{year}년 9월</p>
          <div className="flex flex-row items-center">
            <div className="w-2.5 h-2.5 bg-green-900 rounded-full mr-2"></div>
            <p className="font-kbogothicmedium text-xs mr-2">홈 경기</p>
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-full mr-2"></div>
            <p className="font-kbogothicmedium text-xs mr-2">원정 경기</p>
          </div>
        </div>

        {/* 요일 표시 */}
        <div className="grid grid-cols-7 text-center mb-3 font-kbogothicbold">
          {daysOfWeek.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* 날짜 표시 */}
        <div className="grid grid-cols-7 gap-x-6 text-center font-kbogothicmedium text-gray-600">
          {/* 첫 주 앞쪽 공백 채우기 */}
          {Array.from({ length: firstDay.getDay() }).map((_, i) => (
            <div key={i}></div>
          ))}

          {/* 날짜 표시 */}
          {dates.map(date => {
            const game = getGameForDate(date);
            const isHomeGame = game ? game.homeTeamId === team : false;
            console.log(isHomeGame)

            return (
              <div key={date.getDate()} className="flex flex-col justify-center items-center">
                {/* 날짜 숫자 */}
                <div className="text-[10px] m-2 text-gray-600">{date.getDate()}</div>

                {game ? (
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border-2 bg-white ${
                      isHomeGame
                        ? "border-green-900"
                        : "border-gray-300"
                    }`}
                  >
                    {/* 경기 정보가 있는 경우 로고 넣기 */}
                    <>
                      <img
                        className="w-6 h-6"
                        src={ClubLogos[getClubIdByNum(isHomeGame ? game.awayTeamId : game.homeTeamId)]}
                        alt="팀 로고"
                      />
                    </>
                  </div>
                ) : (
                  // 경기가 없는 날짜는 테두리가 없는 정사각형
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white" />
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
