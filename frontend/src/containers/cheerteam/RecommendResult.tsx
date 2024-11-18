import axiosInstance from "../../util/axiosInstance";
import { useNavigate } from "react-router-dom";
import RecommendResultComponent from "../../components/cheerteam/RecommendResult";
import ResultButton from "../../components/cheerteam/ResultButton";
import ClubId from "../../util/ClubId";
import { useDispatch } from "react-redux";
import { setCheeringClub } from "../../redux/teamSlice";

interface RecommendResultProps {
  club: "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";
  name: string;
}

const RecommendResult = (props: RecommendResultProps) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const updateFavoriteTeam = async (favoriteTeamId: number) => {
    const userId = 5;
    const params = { teamId: favoriteTeamId, userId: userId };

    try {
      const response = await axiosInstance.patch(
        `/api-user/users/${userId}/favorite-team`,
        {},
        {
          params,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("응답 결과:", response.data);

      dispatch(setCheeringClub(favoriteTeamId));
    } catch (error) {
      console.error("에러 발생:", error);
      throw error;
    }
  };

  const onCheerClick = () => {
    updateFavoriteTeam(ClubId[props.club]);
    nav(-1);
  };

  const onReClick = () => {
    nav("/cheerteam");
  };

  return (
    <>
      <RecommendResultComponent club={props.club} name={props.name} />
      <ResultButton onCheerClick={onCheerClick} onReClick={onReClick} />
    </>
  );
};

export default RecommendResult;
