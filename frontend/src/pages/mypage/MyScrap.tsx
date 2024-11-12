import { useNavigate } from "react-router-dom"
import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import MyScrapContainer from "../../containers/mypage/MyBoard"

const MyScrap = () => {

  const nav = useNavigate()
  const goMypage = () => {
    nav('/mypage')
  }
 
  return (
    <>
      <SectionBox label="스크랩" onBackClick={goMypage}/>
      <Container>
        <MyScrapContainer />
      </Container>
    </>
  )
}

export default MyScrap