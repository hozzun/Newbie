import ClubChangeButton from "../../components/cheersong/ClubChangeButton"
import PageName from "../../components/common/PageName"
import CountSong from "../../components/cheersong/CountSong"
import CheerSongComponent from "../../components/cheersong/CheerSong"

const CheerSong = () => {

  // TODO: Navigate 설정, 음악 개수 받아오기

  const goClubSelect = () => {
    console.log('구단 선택 페이지로 이동')
  }

  return (
    <>
      <PageName label="응원가" />
      <ClubChangeButton club="ssg" onClick={goClubSelect} />
      <CountSong count={30} />
      <CheerSongComponent club="ssg" title="랜더스여" singer="We are 랜더스 파이팅"/>
    </>
  )
}

export default CheerSong