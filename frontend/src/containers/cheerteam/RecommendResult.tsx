import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecommendResultComponent from "../../components/cheerteam/RecommendResult"
import ResultButton from "../../components/cheerteam/ResultButton"
import ClubId from "../../util/ClubId";

interface RecommendResultProps {
  club: 
  | "doosan"
  | "hanwha"
  | "kia"
  | "kiwoom"
  | "kt"
  | "lg"
  | "lotte"
  | "nc"
  | "samsung"
  | "ssg";
  name: string;
}

const RecommendResult = (props: RecommendResultProps) => {

  const nav = useNavigate()

  // TODO: URL 수정
  const updateFavoriteTeam = async (favoriteTeamId: number) => {

    const api_url = import.meta.env.VITE_CHEER_TEAM

    try {
      const response = await axios.patch(api_url, {
        favoriteTeamId: favoriteTeamId,
      });
  
      console.log("응답 결과:", response.data);
    } catch (error) {
      console.error("에러 발생:", error);
      throw error;
    }
  };

  const onCheerClick = () => {
    updateFavoriteTeam(ClubId[props.club])
    nav(-1)
  }

  const onReClick = () => {
    nav(-1)
  }

  return (
    <>
      <RecommendResultComponent club={props.club} name={props.name} />
      <ResultButton onCheerClick={onCheerClick} onReClick={onReClick}/>
    </>
  )
}

export default RecommendResult