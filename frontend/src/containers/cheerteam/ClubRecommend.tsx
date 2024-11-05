import { useState } from "react";
import ClubRecommendComponent from "../../components/cheerteam/ClubRecommend";
import InputMbtiComponent from "../../components/cheerteam/InputMbti";
import questions from "../../util/ClubRecommendQuestion";

const ClubRecommend = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [mbti, setMbti] = useState<string | null>(null);
  const [region, setRegion] = useState<string>("충청");
  const [addPage, setAddPage] = useState<number>(1);

  const handleMbtiSubmit = (writeMbti: string) => {
    setMbti(writeMbti);
    setPage(1);
  };

  const goNextPage = (selectedChoice: number) => {

    if (page <= 4) {
      setSelectedChoices((prevChoices) => [
        ...prevChoices,
        selectedChoice + addPage
      ]);
      setAddPage(addPage + 2);
    }

    // 최종 결과 출력
    if (page === questions.length) {
      const choice = selectedChoice == 1 ? '' : region;
      setRegion(choice);

      console.log("MBTI:", mbti);
      console.log("모든 선택지:", selectedChoices);
      console.log("지역:", choice)
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
