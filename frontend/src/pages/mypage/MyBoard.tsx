import { useNavigate } from "react-router-dom"
import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import MyBoardContainer from "../../containers/mypage/MyBoard"

const MyBoard = () => {

  const nav = useNavigate()
  const goMypage = () => {
    nav('/mypage')
  }
 
  return (
    <>
      <SectionBox label="나의 게시글" onBackClick={goMypage}/>
      <Container>
        <MyBoardContainer />
      </Container>
    </>
  )
}

export default MyBoard