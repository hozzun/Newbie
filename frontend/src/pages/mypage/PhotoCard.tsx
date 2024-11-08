import { useNavigate } from "react-router-dom"
import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import PhotoCardContainer from "../../containers/mypage/PhotoCard"

const PhotoCard = () => {

  const nav = useNavigate()
  const goMyPage = () => {
    nav('/mypage')
  }

  return(
    <>
      <SectionBox label="포토카드" onClick={goMyPage}/>
      <Container>
        <PhotoCardContainer />
      </Container>
    </>
  )
}

export default PhotoCard