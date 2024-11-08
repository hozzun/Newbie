import TabBar from "../../components/cardStore/TabBar"
import ClubSelect from "../../components/common/ClubSelect"
import PhotoCardComponent from "../../components/mypage/PhotoCard"
import Karina from "../../assets/images/karina.jpg";

const PhotoCard = () => {

  const goCardDetail = () => {
    console.log('선수 카드 상세 정보 페이지로 이동')
  } 

  return(
    <>
      <ClubSelect />
      <div className="m-5">
        <TabBar />
        <p className="text-base font-kbogothicmedium text-gray-700 my-5">총 6개</p>
        <PhotoCardComponent imgSrc={Karina} onClick={goCardDetail} />
        <PhotoCardComponent imgSrc={Karina} onClick={goCardDetail} />
        <PhotoCardComponent imgSrc={Karina} onClick={goCardDetail} />
      </div>
    </>
  )
}

export default PhotoCard