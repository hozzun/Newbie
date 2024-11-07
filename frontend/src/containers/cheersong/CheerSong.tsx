import ClubChangeButton from "../../components/cheersong/ClubChangeButton"
import PageName from "../../components/common/PageName"
import CountSong from "../../components/cheersong/CountSong"
import CheerSongComponent from "../../components/cheersong/CheerSong"
import MusicController from "../../components/common/MusicController"
import { useNavigate } from "react-router-dom"

const CheerSong = () => {
  // TODO: Navigate 설정, 음악 데이터 받아오기(개수, 제목, 가수 등), 음악 컨트롤러 설정
  const navigate = useNavigate()

  const goClubSelect = () => {
    console.log('구단 선택 페이지로 이동')
  }

  const goLyris = () => {
    navigate('/cheersong/cheerlyris')
  }

  return (
    <>
      <PageName label="응원가" />
      <ClubChangeButton club="ssg" onClick={goClubSelect} />
      <CountSong count={30} />
      <CheerSongComponent club="ssg" title="랜더스여" singer="We are 랜더스 파이팅" onClick={goLyris} showIcon={true} />
      <MusicController />
    </>
  )
}

export default CheerSong