import RecommendResultComponent from "../../components/cheerteam/RecommendResult"
import ResultButton from "../../components/cheerteam/ResultButton"

const RecommendResult = () => {

  const onCheerClick = () => {
    console.log('응원 구단 업데이트')
    // TODO: 응원 구단 업데이트 API 연결
  }

  const onReClick = () => {
    console.log('응원 구단 다시 추천 받기')
    // TODO: 추천 페이지로 이동
  }

  return (
    <>
      <RecommendResultComponent club="hanwha" name="김미량" />
      <ResultButton onCheerClick={onCheerClick} onReClick={onReClick}/>
    </>
  )
}

export default RecommendResult