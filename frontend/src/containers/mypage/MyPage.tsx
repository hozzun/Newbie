import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../util/axiosInstance";
import PageName from "../../components/common/PageName";
import Pencil from "../../assets/icons/pencil-solid.svg?react";
import Profile from "../../components/mypage/Profile";
import Image from "../../assets/images/karina.jpg";
import ClubChangeButton from "../../components/common/ClubChangeButton";
import ClubLogos from "../../util/ClubLogos";
import ClubFullName from "../../util/ClubFullName";
import MainButton from "../../components/mypage/MainButton";
import Calendar from "../../components/mypage/Calendar";
import WatchGame from "../../components/mypage/WatchGame";
import OutButton from "../../components/mypage/OutButton";
import { getIdByNum } from "../../util/ClubId";

interface UserInfo {
  email: string;
  nickname: string;
  address: string;
  profileImage: string;
  favoriteTeamId: number;
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

  console.log(setUserInfo);
  const nav = useNavigate();

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
    try {
      const response = await axiosInstance.get("/api-user/users/5", {
        params: { userId: 5 }, // TODO: userId 삭제 예정
      });
      const userData: UserInfo = response.data;
      setUserInfo(userData);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (userInfo) {
    const teamName = getIdByNum(userInfo.favoriteTeamId) as TeamName | null;

    return (
      <>
        <div className="flex justify-between items-center">
          <PageName label="마이페이지" />
          <Pencil className="w-6 h-6 text-gray-500 hover:cursor-pointer" onClick={goRevise} />
        </div>
        {userInfo && (
          <div>
            <Profile img={Image} name={userInfo.nickname} email={userInfo.email} />
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
            <Calendar />
            <WatchGame />
            <OutButton />
          </div>
        )}
      </>
    );
  }
};

export default MyPage;
