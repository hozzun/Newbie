import CardDetail from "../../components/mypage/CardDetail";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react"
import axiosInstance from "../../util/axiosInstance";
import Dialog from "../../components/common/Dialog";
import { ButtonProps } from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import { useNavigate } from "react-router-dom";

interface Player {
  backNumber: string
  name: string
  teamId: number
  position: string
  birth: string
  physical: string
  academic: string
}

const PhotoCardDetail = () => {

  const nav = useNavigate()
  const location = useLocation();
  const { id, no, team, imageUrl  } = location.state || {};
  
  const [player, setPlayer] = useState<Player | null>(null);
  const [show, setShow] = useState<boolean>(false)

  const getPlayer = async () => {

    const params = { teamId: team, backNumber: no }

    try {
      const response = await axiosInstance.get(`/api/v1/players/photos/${team}/${no}`, { params });
      setPlayer(response.data)
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  useEffect(() => {
    getPlayer();
  }, []);

  const deletePlayer = async () => {

    const params = { cardId: id }

    try {
      const response = await axiosInstance.delete("/api/v1/cards/delete", { params });
      console.log(response.data)
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  const deleteClick = () => {
    setShow(true)
  }

  const deleteCard = () => {
    deletePlayer()
    nav(-1)
  }

  const yesRemove: ButtonProps = {
    variant: BUTTON_VARIANTS.primary,
    children: "네",
    onClick: () => deleteCard()
  };

  const noLogout: ButtonProps = {
    variant: BUTTON_VARIANTS.yellowGreen,
    children: "아니오",
    onClick: () => setShow(false)
  };

  return (
    <>
      {player && (
        <CardDetail player={player} image={imageUrl} onClick={deleteClick} />
      )}
      {show && <Dialog title="삭제하기" body="정말 삭제하시겠습니까?" yesButton={yesRemove} noButton={noLogout} />}
  </>
  )
}

export default PhotoCardDetail