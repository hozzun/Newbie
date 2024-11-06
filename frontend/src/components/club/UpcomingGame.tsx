import clubs from "../home/clubs";

const NoUpcomingGame = () => {
  return (
    <div className="mt-3 flex flex-col justify-center items-center w-full rounded-lg shadow-md bg-white aspect-[2.5/1]">
      예정된 경기가 없습니다...😥
    </div>
  );
};

const YesUpcomingGame = () => {
  return (
    <div className="mt-3 flex flex-col justify-center items-center w-full rounded-lg shadow-md bg-white py-6">
      <p className="text-xl font-kbogothicbold text-gray-700">수원케이티위즈파크</p>
      <p className="text-sm font-kbogothicmedium text-gray-700 mt-2">2024.10.01 (화) 17:00</p>
      <img src={clubs["kt"].imgSrc} alt="kt logo" className="w-20 h-20 mt-6" />
    </div>
  );
};

const UpcomingGame = () => {
  const isExistedUpcomingGame = true;

  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">예정된 경기</p>
      </div>
      {isExistedUpcomingGame ? <YesUpcomingGame /> : <NoUpcomingGame />}
    </div>
  );
};

export default UpcomingGame;
