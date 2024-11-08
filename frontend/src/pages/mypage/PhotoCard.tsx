import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import PhotoCardContainer from "../../containers/mypage/PhotoCard"

const PhotoCard = () => {

  return(
    <>
      <SectionBox label="포토카드" />
      <Container>
        <PhotoCardContainer />
      </Container>
    </>
  )
}

export default PhotoCard