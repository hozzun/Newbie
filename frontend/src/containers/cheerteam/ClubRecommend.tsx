import { useState } from "react";
import ClubRecommendComponent from "../../components/cheerteam/ClubRecommend";
import InputMbtiComponent from "../../components/cheerteam/InputMbti"
import questions from "../../util/ClubRecommendQuestion";

const ClubRecommend = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [mbti, setMbti] = useState<string | null>(null);

  const handleMbtiSubmit = (writeMbti: string) => {
    setMbti(writeMbti);
    setPage(1);
  };

  const goNextPage = (selectedChoice: number) => {
    setSelectedChoices((prevChoices) => [...prevChoices, selectedChoice]);
    
    if (page === questions.length) {
      console.log(mbti)
      console.log("모든 선택지: ", selectedChoices.concat(selectedChoice)); // 최종 결과
    }

    if (page < questions.length) {
      setPage(page + 1);
    }
  };


  return (
    <>
      {page === 0 ? (
        <InputMbtiComponent onOkClick={handleMbtiSubmit} />
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
