import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import { useState } from 'react'
import CheerTeamComponents from "../../components/cheerteam/CheerTeam";
import ClubSelectItemComponents from "../../components/cheerteam/ClubSelectItem";
import ClubId from "../../util/ClubId";

const CheerTeam = () => {
  const [selectedClub, setSelectedClub] = useState<number>(0);

  const nav = useNavigate()

  const updateFavoriteTeam = async (favoriteTeamId: number) => {

    try {
      const response = await axiosInstance.patch("/api-user/users/favorite-team", {
        teamId: favoriteTeamId,
      });
  
      console.log("응답 결과:", response.data);
    } catch (error) {
      console.error("에러 발생:", error);
      throw error;
    }
  };

  const handleClubSelect = (club: string) => {
    setSelectedClub(ClubId[club]);
    updateFavoriteTeam(selectedClub)
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
