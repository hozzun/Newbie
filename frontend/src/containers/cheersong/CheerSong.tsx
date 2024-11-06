import ClubChangeButton from "../../components/common/ClubChangeButton"
import PageName from "../../components/common/PageName"
import ClubLogos from "../../util/ClubLogos"

const CheerSong = () => {

  return (
    <>
      <PageName label="응원가" />
      <ClubChangeButton clubColor="ssg" logo={ClubLogos["ssg"]} club="ssg" />
    </>
  )
}

export default CheerSong