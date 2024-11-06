import ClubChangeButton from "../../components/cheersong/ClubChangeButton"
import PageName from "../../components/common/PageName"

const CheerSong = () => {

  const goClubSelect = () => {
    console.log('구단 선택 페이지로 이동')
  }

  return (
    <>
      <PageName label="응원가" />
      <ClubChangeButton onClick={goClubSelect} />
    </>
  )
}

export default CheerSong