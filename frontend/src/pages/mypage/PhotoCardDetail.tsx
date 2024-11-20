import SectionBox from "../../components/common/SectionBox"
import Container from "../../components/common/Container";
import CardDetail from "../../containers/mypage/PhotoCardDetail";
import { useNavigate } from "react-router-dom";

const PhotoCardDetail = () => {

  const nav = useNavigate()

  const getPhotoCard = () => {
    nav('/mypage/photocard')
  }

  return (
    <>
      <SectionBox label="포토카드" onBackClick={getPhotoCard} />
      <Container>
        <CardDetail />
      </Container>
    </>
  )
}

export default PhotoCardDetail