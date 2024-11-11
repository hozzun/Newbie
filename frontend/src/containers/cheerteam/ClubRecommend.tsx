import { useState } from "react";
import ClubRecommendComponent from "../../components/cheerteam/ClubRecommend";
import InputMbtiComponent from "../../components/cheerteam/InputMbti";
import questions from "../../util/ClubRecommendQuestion";
import RecommendResult from "./RecommendResult";

type TeamName = "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";

const ClubRecommend = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [mbti, setMbti] = useState<string | null>(null);
  const [region, setRegion] = useState<string>("");
  // TODO: 유저 Id, 이름, 지역 정보 가져오기
  const [addPage, setAddPage] = useState<number>(1);
  const [myClub, setMyClub] = useState<TeamName>("doosan");

  // 추천 알고리즘 연결
  const ClubRecommendAPI = async () => {
    const api_url = import.meta.env.VITE_CLUB_RECOMMEND;
    const UserData = {
      "userId": 1,
      "mbti": mbti,
      "responses": selectedChoices,
      "region": region,
    };
  
    console.log("입력 데이터", UserData);
  
    try {
      const response = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserData), // JSON 형태로 데이터 변환
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // 응답이 비어있지 않은 경우에만 JSON 파싱 시도
      const textData = await response.text();
      if (textData) {
        const data = JSON.parse(textData);
        setMyClub(data.recommended_team[0]);
      } else {
        console.warn("Response is empty or not JSON.");
      }
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  const handleMbtiSubmit = (writeMbti: string) => {
    setMbti(writeMbti);
    setPage(1);
  };

  const goNextPage = (selectedChoice: number) => {
    setPage(page + 1);

    if (page <= 4) {
      setSelectedChoices(prevChoices => [...prevChoices, selectedChoice + addPage]);
      setAddPage(addPage + 2);
    }

    else {
      const choice = selectedChoice == 1 ? "" : "충청";
      setRegion(choice);
      ClubRecommendAPI();
    }
  };

  const NameCheck = (myClub: TeamName): TeamName => {
    if (["doosan", "hanwha", "kia", "kiwoom", "kt", "lg", "lotte", "nc", "samsung", "ssg"].includes(myClub)) {
      return myClub;
    }
    return "doosan";
  };

  return (
    <>
      {page === 0 ? (
        <InputMbtiComponent onOkClick={handleMbtiSubmit} />
      ) : page <= questions.length ? (
        <ClubRecommendComponent subway={questions[page - 1]} onOkClick={goNextPage} />
      ) : (
        <RecommendResult club={NameCheck(myClub)} name="김미량" />
      )}
    </>
  );
};

export default ClubRecommend;
