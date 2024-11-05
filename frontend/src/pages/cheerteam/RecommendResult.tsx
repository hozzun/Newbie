import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import RecommendResultContainer from "../../containers/cheerteam/RecommendResult"

const RecommendResult = () => {

  return (
    <>
      <SectionBox label="구단 추천"/>
      <Container>
        <RecommendResultContainer />
      </Container>
    </>
  )
}

export default RecommendResult