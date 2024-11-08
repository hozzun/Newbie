import CalenderIcon from "../../assets/icons/calender.svg?react"
import { useState } from 'react';

const Calendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 현재 연도와 월 가져오기
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 첫째 날과 마지막 날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 요일 배열
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
        {/* 달과 연도 */}
        <h2 className="font-kbogothicbold text-lg mb-5">
          {year}년 {month + 1}월
        </h2>
  
        {/* 요일 표시 */}
        <div className="grid grid-cols-7 text-center mb-5 font-kbogothicbold">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
  
        {/* 날짜 표시 */}
        <div className="grid grid-cols-7 text-center font-kbogothicmedium">
          {/* 첫 주 앞쪽 공백 채우기 */}
          {Array.from({ length: firstDay.getDay() }).map((_, i) => (
            <div key={i}></div>
          ))}
  
          {/* 날짜 표시 */}
          {dates.map((date) => (
            <div key={date.getDate()} className="p-2 border border-gray-300">
              {date.getDate()}
            </div>
          ))}
        </div>
        </div>
      </>
  )
}

export default Calendar