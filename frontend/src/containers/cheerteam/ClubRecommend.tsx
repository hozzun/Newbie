import { useState } from "react"
import ClubRecommendComponent from "../../components/clubrecommend/ClubRecommend"
import questions from "../../util/ClubRecommendQuestion";

const ClubRecommend = () => {
  const [page, setPage] = useState<number>(1);

  const goNextPage = () => {
    if (page < questions.length) {
      // TODO: 선택지 저장
      setPage(page + 1);
    }
  }

  return (
    <ClubRecommendComponent subway={questions[page]} onOkClick={goNextPage} />
  )
}

export default ClubRecommend;