import PageName from "../../components/common/PageName"
import Pencil from "../../assets/icons/pencil-solid.svg?react"
import Profile from "../../components/mypage/Profile"
import Image from "../../assets/images/karina.jpg"

const MyPage = () => {

  const goRevise = () => {
    // TODO: navigate 설정
    console.log('회원 정보 수정 페이지로 이동')
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PageName label="마이페이지" />
        <Pencil className="w-6 h-6 text-gray-500" onClick={goRevise} />
      </div>
      <Profile img={Image} name="미량" email="miryang1016@gmail.com" />
    </>
  )
}

export default MyPage