import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import CameraCaptureContainer from "../../containers/mypage/CameraCapture"

const CameraCapture = () => {

  return (
    <>
      <SectionBox label="카메라"/>
      <Container>
        <CameraCaptureContainer />
      </Container>

    </>
  )
}

export default CameraCapture