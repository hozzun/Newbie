import { useState } from 'react';
import ClubRecommend from "../../containers/clubrecommend/ClubRecommend";

function ClubRecommendPage() {

  const [page, setPage] = useState(1);

  const pageData = [
    { question: "경기 스타일", select1: "공격적인 득점", select2: "전략적인 수비" },
    { question: "현재 성적 VS 미래 전망", select1: "현재 성적이 중요", select2: "성장 가능성이 중요" },
    { question: "구단 이미지와 성향", select1: "전통적, 안정적", select2: "신생, 빠른 성장" },
    { question: "팬과의 소통", select1: "중요하다", select2: "상관없다" },
    { question: "연고지", select1: "지역 팀 선호", select2: "상관없다" }
  ];

  const goToNextPage = () => {
    if (page < pageData.length) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <ClubRecommend 
        question={pageData[page - 1].question} 
        select1={pageData[page - 1].select1} 
        select2={pageData[page - 1].select2} 
        onOkClick={goToNextPage}  // "확인" 버튼 클릭 시 호출
      />
    </>
  );
}

export default ClubRecommendPage;