import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../util/axiosInstance";
import Storage from "../../assets/icons/storage.svg?react";
import WatchCard from "../../components/mypage/WatchCard";
import Plus from "../../assets/icons/plus.svg?react";
import ClubId from "../../util/ClubId";

interface WatchGameData {
  id: string;
  imageUrl: string;
  date: string;
  team1English: string;
  team1Korean: string;
  team2Korean: string;
}

const WatchGameInfo = () => {
  const [watchGames, setWatchGames] = useState<WatchGameData[]>([]);
  const nav = useNavigate();

  const goCamera = () => {
    nav("/camera");
  };

  const goGameResult = (id: string, date: string, team1English: string) => {
    const [year, month, day] = date.split(".");

    // month와 day를 두 자릿수로 맞추기
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    // team1English를 이용해 teamId를 가져오기
    const teamId = ClubId[team1English as keyof typeof ClubId];

    nav(`/mypage/watchgame/${id}`, {
      state: { year, month: formattedMonth, day: formattedDay, teamId },
    });
  };

  const getWatchList = async () => {

    try {
      const response = await axiosInstance.get("/api/v1/mypage/ticket/list");
      setWatchGames(response.data);
    } catch (error) {
      console.error("Error fetching cheer song:", error);
    }
  };

  useEffect(() => {
    getWatchList();
  }, []);

  return (
    <div className="my-7">
      <div className="flex flex-row">
        <Storage className="w-6 h-6 text-gray-200 mr-3" />
        <p className="font-kbogothicbold text-gray-600 mb-3"> 나의 직관 경기</p>
      </div>
      <div className="grid grid-cols-2 justify-center items-center gap-7">
        {watchGames.map(game => (
          <WatchCard
            key={game.id}
            date={game.date}
            team1={game.team1Korean}
            team2={game.team2Korean}
            img={game.imageUrl}
            onClick={() => goGameResult(game.id, game.date, game.team1English)}
          />
        ))}
        <div className="w-full h-44 rounded-2xl bg-gray-200 flex justify-center items-center">
          <Plus className="w-6 h-6 text-gray-500 hover:cursor-pointer" onClick={goCamera} />
        </div>
      </div>
    </div>
  );
};

export default WatchGameInfo;
