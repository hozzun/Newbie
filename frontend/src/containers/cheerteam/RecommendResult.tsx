import RecommendResultComponent from "../../components/cheerteam/RecommendResult"
import ResultButton from "../../components/cheerteam/ResultButton"

interface RecommendResultProps {
  club: string;
  name: string;
}

const RecommendResult = (props: RecommendResultProps) => {

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
      <RecommendResultComponent club={props.club} name={props.name} />
      <ResultButton onCheerClick={onCheerClick} onReClick={onReClick}/>
    </>
  )
}

export default RecommendResult