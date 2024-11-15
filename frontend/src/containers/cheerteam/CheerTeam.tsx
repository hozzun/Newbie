import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import { useState } from 'react'
import CheerTeamComponents from "../../components/cheerteam/CheerTeam";
import ClubSelectItemComponents from "../../components/cheerteam/ClubSelectItem";
import ClubId from "../../util/ClubId";
import { useDispatch } from 'react-redux';
import { fetchTeam } from '../../redux/teamSlice';
import { AppDispatch } from "../../redux/store";

const CheerTeam = () => {
  const [selectedClub, setSelectedClub] = useState<number>(0);
  console.log(selectedClub)

  const nav = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const updateFavoriteTeam = async (favoriteTeamId: number) => {

    // TODO: userId 수정
    const userId = 5;
    const params = { teamId: favoriteTeamId, userId: userId };

    try {
      const response = await axiosInstance.patch(
        `/api-user/users/${userId}/favorite-team`,
        {},
        {
          params,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("응답 결과:", response.data);
      dispatch(fetchTeam());
    } catch (error) {
      console.error("에러 발생:", error);
      throw error;
    }
  };

  const handleClubSelect = (club: string) => {
    setSelectedClub(ClubId[club]);
    updateFavoriteTeam(ClubId[club])
    nav(-1)
  };


  return (
    <>
      <CheerTeamComponents />
      <ClubSelectItemComponents onClick={handleClubSelect} />
    </>
  );
};

export default CheerTeam;
