import { useState } from "react";
import ClubRecommendComponent from "../../components/cheerteam/ClubRecommend";
import InputMbti from "./InputMbti";
import questions from "../../util/ClubRecommendQuestion";

const ClubRecommend = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);

  const goNextPage = (selectedChoice: number) => {
    setSelectedChoices((prevChoices) => [...prevChoices, selectedChoice]);
    
    if (page === questions.length) {
      console.log("모든 선택지: ", selectedChoices.concat(selectedChoice)); // 최종 결과
    }

    if (page < questions.length) {
      setPage(page + 1);
    }
  };

  return (
    <>
      {page === 0 ? (
        <InputMbti onClick={() => setPage(1)} />
      ) : (
        <ClubRecommendComponent
          subway={questions[page - 1]}
          onOkClick={goNextPage}
        />
      )}
    </>
  );
};

export default ClubRecommend;
