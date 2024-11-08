import { useNavigate } from "react-router-dom"
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

const MyPage = () => {

  const nav = useNavigate()
  // TODO: 회원 정보 가져오기(image, name, email, favorite-team)

  const goRevise = () => {
    // TODO: navigate 설정
    console.log('회원 정보 수정 페이지로 이동')
  }

  const goRecommend = () => {
    nav('/clubrecommend')
  }

  const goPhotoCard = () => {
    console.log('포토카트 페이지로 이동')
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

  return (
    <>
      <div className="flex justify-between items-center">
        <PageName label="마이페이지" />
        <Pencil className="w-6 h-6 text-gray-500" onClick={goRevise} />
      </div>
      <Profile img={Image} name="미량" email="miryang1016@gmail.com" />
      <ClubChangeButton logo={ClubLogos["ssg"]} clubColor="ssg" club={ClubFullName["ssg"]} onClick={goRecommend} />
      <MainButton photoClick={goPhotoCard} writeClick={goWrite} activeClick={goActive} scrapClick={goScrap} />
      <Calendar />
      <WatchGame />
      <OutButton logoutClick={goLogout} deleteClick={goDelete} />
    </>
  )
}

export default MyPage