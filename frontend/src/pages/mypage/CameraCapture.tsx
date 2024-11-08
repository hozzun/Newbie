import { useNavigate } from "react-router-dom"
import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import CameraCaptureContainer from "../../containers/mypage/CameraCapture"

const CameraCapture = () => {

  const nav = useNavigate()

  const goBefore = () => {
    nav(-1)
  }

  return (
    <>
      <SectionBox label="카메라" onClick={goBefore} />
      <Container>
        <CameraCaptureContainer />
      </Container>

    </>
  )
}

export default CameraCapture