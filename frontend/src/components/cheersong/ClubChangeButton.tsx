import ClubFullName from "../../util/ClubFullName"
import ClubLogos from "../../util/ClubLogos"
import ClubChangeButtonCommon from "../common/ClubChangeButton"

interface ClubChangeButtonProps {
  onClick: () => void;
}

const ClubChangeButton = (props: ClubChangeButtonProps) => {

  // TODO: 유저 정보 가져오기

  return (
    <>
      <ClubChangeButtonCommon clubColor="ssg" logo={ClubLogos["ssg"]} club={ClubFullName["ssg"]} onClick = {props.onClick} />
    </>
  )
}

export default ClubChangeButton