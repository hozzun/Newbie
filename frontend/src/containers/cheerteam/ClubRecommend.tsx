import { useState } from "react";
import ClubRecommendComponent from "../../components/cheerteam/ClubRecommend";
import InputMbtiComponent from "../../components/cheerteam/InputMbti";
import questions from "../../util/ClubRecommendQuestion";
// import RecommendResult from "./RecommendResult";

const ClubRecommend = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [mbti, setMbti] = useState<string | null>(null);
  const [region, setRegion] = useState<string>('');
  // TODO: 유저 이름, 지역 정보 가져오기
  const [addPage, setAddPage] = useState<number>(1);
  // const [myClub, setMyClub] = useState<string>('')

  // 추천 알고리즘 연결
  const ClubRecommendAPI = async () => {
    const UserData = {
      mbti: mbti,
      responses: selectedChoices,
      region: region,
    };
  
    try {
      // TODO: 실제 API 주소 입력하기
      const response = await fetch("http://localhost:8000/recommend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserData), // JSON 형태로 데이터 변환
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Recommended team:", data.recommended_team);
      // setMyClub(data.recommended_team)
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  const handleMbtiSubmit = (writeMbti: string) => {
    setMbti(writeMbti);
    setPage(1);
  };

  const goNextPage = (selectedChoice: number) => {

    if (page < questions.length) {
      setPage(page + 1);
    }

    if (page <= 4) {
      setSelectedChoices((prevChoices) => [
        ...prevChoices,
        selectedChoice + addPage
      ]);
      setAddPage(addPage + 2);
    }

    // 최종 결과 출력
    if (page === questions.length) {
      const choice = selectedChoice == 1 ? '' : '충청';
      setRegion(choice);
      ClubRecommendAPI();

      // TODO: 추천 결과 확인 페이지로 이동
      console.log("MBTI:", mbti);
      console.log("모든 선택지:", selectedChoices);
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