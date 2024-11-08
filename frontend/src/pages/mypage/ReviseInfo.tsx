import { useNavigate } from "react-router-dom"
import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import ReviseInfoContainer from "../../containers/mypage/ReviseInfo"

const ReviseInfo = () => {

  const nav = useNavigate()
  const goMyPage = () => {
    nav("/mypage")
  }

  return (
    <>
      <SectionBox label="마이페이지" onClick={goMyPage}/>
      <Container>
        <ReviseInfoContainer />
      </Container>
    </>
  )
}

export default ReviseInfo