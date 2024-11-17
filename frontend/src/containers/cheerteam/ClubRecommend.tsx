import { useState, useEffect } from "react";
import axiosInstance from "../../util/axiosInstance";
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
  const [addPage, setAddPage] = useState<number>(1);
  const [myClub, setMyClub] = useState<TeamName>("doosan");
  const [name, setName] = useState<string>("")

  const getUser = async () => {
      
    try {
      const response = await axiosInstance.get(`/api-user/users`);
  
      if (response.status === 200) {
        const data = response.data;
        setName(data.nickname)
        const address = data.address.split(' ')[0].substring(0, 2)
        setRegion(address)
      } else {
        console.error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // 추천 알고리즘 연결
  const ClubRecommendAPI = async () => {
    const UserData = {
      "userId": 0,
      "mbti": mbti,
      "responses": selectedChoices,
      "region": region,
    };
  
    console.log("입력 데이터", UserData);
  
    try {
      const response = await axiosInstance.post("/api-mypage/recommend", UserData);
  
      if (response.status === 200) {
        const data = response.data;
        setMyClub(data.recommended_team[0]);
      } else {
        console.error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error)
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
      const choice = selectedChoice == 1 ? "" : region;
      console.log('지역 선택', choice)
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
        <RecommendResult club={NameCheck(myClub)} name={name} />
      )}
    </>
  );
};

export default ClubRecommend;
