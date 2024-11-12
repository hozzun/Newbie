import { useNavigate } from "react-router-dom"
import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import MyActiveContainer from "../../containers/mypage/MyActive"

const MyActive = () => {

  const nav = useNavigate()
  const goMypage = () => {
    nav("/mypage")
  }
  
  return (
    <>
      <SectionBox label="나의 활동" onBackClick={goMypage}/>
      <Container>
        <MyActiveContainer />
      </Container>
    </>
  )
}

export default MyActive