import CalenderIcon from "../../assets/icons/calender.svg?react"
// import { useState } from 'react';
import ClubLogos from "../../util/ClubLogos";

const Calendar = () => {

  // TODO: 경기 정보 가져오기, 경기 일정에 따른 캘린더 표기
  // const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 날짜 배열 만들기
  const dates = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push(new Date(year, month, i));
  }

  return (
    <>
      <div className="flex flex-row">
        <CalenderIcon className="w-6 h-6 ml-5 text-gray-200" />
        <p className="font-kbogothicbold text-gray-600 ml-3">경기 일정</p>
      </div>
      <div className="m-5 p-5 bg-gray-100 rounded-2xl">
        <div className="flex flex-row justify-between">
          <p className="font-kbogothicbold text-lg mb-5">
            {year}년 {month + 1}월
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
        <div className="grid grid-cols-7 text-center font-kbogothicmedium text-gray-200">
          {/* 첫 주 앞쪽 공백 채우기 */}
          {Array.from({ length: firstDay.getDay() }).map((_, i) => (
            <div key={i}></div>
          ))}
  
          {/* 날짜 표시 */}
          {dates.map((date) => (
            <div className="flex flex-col p-2 m-1 bg-white rounded-2xl text-xs">
              <div className="flex justify-end" key={date.getDate()}>
                {date.getDate()}
              </div>
              {/* 이 부분은 경기 정보가 있을 경우에만! */}
              <img className="flex justify-center items-center mb-1 h-5" src={ClubLogos["doosan"]}></img>
              <p>인천</p>
            </div>
          ))}
        </div>
        </div>
      </>
  )
}

export default Calendar