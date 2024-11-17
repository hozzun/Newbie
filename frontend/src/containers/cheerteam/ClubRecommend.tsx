import { useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import ClubRecommendComponent from "../../components/cheerteam/ClubRecommend";
import InputMbtiComponent from "../../components/cheerteam/InputMbti";
import questions from "../../util/ClubRecommendQuestion";
import RecommendResult from "./RecommendResult";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type TeamName = "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";

const ClubRecommend = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [mbti, setMbti] = useState<string | null>(null);
  const [addPage, setAddPage] = useState<number>(1);
  const [myClub, setMyClub] = useState<TeamName>("doosan");
  const { nickname, address } = useSelector((state: RootState) => state.myInfo);
  const new_address = address.split(' ')[0].substring(0, 2)

  // 추천 알고리즘 연결
  const ClubRecommendAPI = async (choice: string) => {
    const UserData = {
      "userId": 0,
      "mbti": mbti,
      "responses": selectedChoices,
      "region": choice,
    };
  
    try {
      const response = await axiosInstance.post("/api/v1/recommend", UserData);
  
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
      const choice = selectedChoice == 1 ? "" : new_address;
      ClubRecommendAPI(choice);
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
        <RecommendResult club={NameCheck(myClub)} name={nickname} />
      )}
    </>
  );
};

export default ClubRecommend;
