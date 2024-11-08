import SectionBox from "../../components/common/SectionBox"
import Container from "../../components/common/Container";
import CardDetail from "../../components/mypage/CardDetail";
import Karina from "../../assets/images/karina.jpg"

const PhotoCardDetail = () => {

  // TODO: 실제 카드 선수 정보 가져오기, 삭제 api 연결
  const player = {
    cardImg: Karina,
    number: "27",
    name: "김진우",
    team: "기아 타이거즈",
    birthday: "1991.08.07",
    physical: "185cm, 90kg",
    position: "투수",
    academic: "중앙대"
  };

  const deleteClick = () => {
    console.log('선수 카드 삭제')
  }

  return (
    <>
      <SectionBox label="포토카드" />
      <Container>
        <CardDetail player={player} onClick={deleteClick} />
      </Container>
    </>
  )
}

export default PhotoCardDetail