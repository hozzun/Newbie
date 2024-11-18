import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import { useState } from "react";
import CheerTeamComponents from "../../components/cheerteam/CheerTeam";
import ClubSelectItemComponents from "../../components/cheerteam/ClubSelectItem";
import ClubId from "../../util/ClubId";
import { useDispatch } from "react-redux";
import { setCheeringClub } from "../../redux/teamSlice";
import Dialog from "../../components/common/Dialog";

const CheerTeam = () => {
  const [selectedClub, setSelectedClub] = useState<number>(0);
  console.log(selectedClub);
  const [show, setShow] = useState<boolean>(false)

  const dispatch = useDispatch();
  const nav = useNavigate();

  const updateFavoriteTeam = async (favoriteTeamId: number) => {
    const params = { teamId: favoriteTeamId };

    try {
      const response = await axiosInstance.patch(
        `/api/v1/user/users/favorite-team`,
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

  const handleClubSelect = (club: string) => {
    setSelectedClub(ClubId[club]);
    updateFavoriteTeam(ClubId[club]);
    setShow(true)
    setTimeout(() => {
      setShow(false)
      nav(-1);
    }, 3000)
  };

  return (
    <>
      <CheerTeamComponents />
      <ClubSelectItemComponents onClick={handleClubSelect} />
      {show && <Dialog title="구단 변경" body="구단 변경 중입니다! 잠시만 기다려주세요⚾" />}
    </>
  );
};

export default CheerTeam;
