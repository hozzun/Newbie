import { useNavigate } from "react-router-dom"
import { useState } from 'react'
// import axiosInstance from "../../util/axiosInstance"
import PageName from "../../components/common/PageName"
import Pencil from "../../assets/icons/pencil-solid.svg?react"
import Profile from "../../components/mypage/Profile"
import Image from "../../assets/images/karina.jpg"
import ClubChangeButton from "../../components/common/ClubChangeButton"
import ClubLogos from "../../util/ClubLogos"
import ClubFullName from "../../util/ClubFullName"
import MainButton from "../../components/mypage/MainButton"
import Calendar from "../../components/mypage/Calendar"
import WatchGame from "../../components/mypage/WatchGame"
import OutButton from "../../components/mypage/OutButton"
import { getClubIdByNum } from "../../util/ClubId"

interface UserInfo {
  email: string
  nickname: string
  address: string
  profileImage: string
  favoriteTeamId: number
}

type TeamName = "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";

const MyPage = () => {

  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: 'mill@ssafy.com',
    nickname: 'mill',
    address: '123 Main Street',
    profileImage: Image,
    favoriteTeamId: 6
  });

  console.log(setUserInfo)
  const nav = useNavigate()
  // TODO: 회원 정보 가져오기(image, name, email, favorite-team), navigate 설정

  const goRevise = () => {
    nav('/mypage/revise')
  }

  const goRecommend = () => {
    nav('/cheerteam')
  }

  const goPhotoCard = () => {
    nav('/mypage/photocard')
  }

  const goWrite = () => {
    console.log('나의 게시글 페이지로 이동')
  }

  const goActive = () => {
    console.log('나의 활동 페이지로 이동')
  }

  const goScrap = () => {
    console.log('나의 스크랩 페이지로 이동')
  }

  const goLogout = () => {
    console.log('로그아웃 모달')
  }

  const goDelete = () => {
    console.log('회원탈퇴 모달')
  }

  // const getUserInfo = async () => {
  //   try {
  //     const response = await axiosInstance.get("/api-user/users", {
  //       params: { userId: 10 } // TODO: userId 삭제 예정
  //     });
  //     const userData: UserInfo = response.data;
  //     setUserInfo(userData);
  //   } catch (error) {
  //     console.error("에러 발생:", error);
  //   }
  // };

  // useEffect(() => {
  //   getUserInfo()
  // }, [])

  if (userInfo) {
    const teamName = getClubIdByNum(userInfo.favoriteTeamId) as TeamName | "doosan";

  return (
    <>
      <div className="flex justify-between items-center">
        <PageName label="마이페이지" />
        <Pencil className="w-6 h-6 text-gray-500 hover:cursor-pointer" onClick={goRevise} />
      </div>
      {userInfo && (
        <div>
          <Profile img={Image} name={userInfo.nickname} email={userInfo.email} />
  
          {/* 구단 이름 매핑 */}
          <ClubChangeButton
            logo={ClubLogos[teamName]}
            clubColor={teamName}
            club={ClubFullName[teamName]}
            onClick={goRecommend}
          />
  
          <MainButton
            photoClick={goPhotoCard}
            writeClick={goWrite}
            activeClick={goActive}
            scrapClick={goScrap}
          />
          <Calendar />
          <WatchGame />
          <OutButton logoutClick={goLogout} deleteClick={goDelete} />
        </div>
      )}
    </>
  );
}}

export default MyPage