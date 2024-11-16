import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../util/axiosInstance";
import PageName from "../../components/common/PageName";
import Pencil from "../../assets/icons/pencil-solid.svg?react";
import Profile from "../../components/mypage/Profile";
import ClubChangeButton from "../../components/common/ClubChangeButton";
import ClubLogos from "../../util/ClubLogos";
import ClubFullName from "../../util/ClubFullName";
import MainButton from "../../components/mypage/MainButton";
import Calendar from "../../components/mypage/Calendar";
import WatchGame from "./WatchGameInfo";
import OutButton from "../../components/mypage/OutButton";
import { getIdByNum } from "../../util/ClubId";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface UserInfo {
  email: string;
  nickname: string;
  address: string;
  profileImage: string;
}

interface Game {
  date: string;
  homeTeamId: number;
  awayTeamId: number;
  stadium: string;
}

type TeamName =
  | "doosan"
  | "hanwha"
  | "kia"
  | "kiwoom"
  | "kt"
  | "lg"
  | "lotte"
  | "nc"
  | "samsung"
  | "ssg";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [games, setGames] = useState<Game[]>([]);
  const { team } = useSelector((state: RootState) => state.team);
  const nav = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const goRevise = () => {
    nav("/mypage/revise", { state: { userInfo } });
  };

  const goRecommend = () => {
    nav("/cheerteam");
  };

  const goPhotoCard = () => {
    nav("/mypage/photocard");
  };

  const goWrite = () => {
    nav("/mypage/board");
  };

  const goActive = () => {
    nav("/mypage/active");
  };

  const goScrap = () => {
    nav("/mypage/scrap");
  };

  const getUserInfo = async () => {
    // TODO: userId 삭제 예정
    const userId = 5

    try {
      const response = await axiosInstance.get(`/api-user/users/${userId}`, {
        params: { userId: userId },
      });
      const userData: UserInfo = response.data;
      setUserInfo(userData);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const getGameInfo = async () => {
    const year = new Date().getFullYear();
    const month = 8; // 9월로 고정
    const formattedMonth = month.toString().padStart(2, "0");
    const params = { year: year.toString(), month: formattedMonth, teamId: team };

    try {
      const response = await axiosInstance.get("/api-baseball/games", { params });
      setGames(response.data);
    } catch (error) {
      console.error("경기 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getGameInfo()
  }, [team])

  if (userInfo) {
    const teamName = getIdByNum(team) as TeamName | 0;

    return (
      <>
        <div className="flex justify-between items-center">
          <PageName label="마이페이지" />
          <Pencil className="w-6 h-6 mb-2 text-gray-500 hover:cursor-pointer" onClick={goRevise} />
        </div>
        {userInfo && (
          <div>
            <Profile img={userInfo.profileImage} name={userInfo.nickname} email={userInfo.email} />
            {teamName ? (
              <ClubChangeButton
                logo={ClubLogos[teamName]}
                clubColor={teamName}
                club={ClubFullName[teamName]}
                onClick={goRecommend}
              />
            ) : (
              <div
                className="flex justify-center items-center font-kbogothicmedium text-lg border-4 border-green-100 text-green-900 m-5 p-10 rounded-2xl hover:cursor-pointer"
                onClick={goRecommend}
              >
                <p>응원할 팀을 선택해주세요!</p>
              </div>
            )}
            <MainButton
              photoClick={goPhotoCard}
              writeClick={goWrite}
              activeClick={goActive}
              scrapClick={goScrap}
            />
            <Calendar games={games} team={team} />
            <WatchGame />
            <OutButton />
          </div>
        )}
      </>
    );
  }
};

export default MyPage;
