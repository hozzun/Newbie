import CardDetail from "../../components/mypage/CardDetail";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react"
import axiosInstance from "../../util/axiosInstance";

interface Player {
  backNumber: string
  name: number
  teamId: string
  position: string
  birth: string
  physical: string
  academic: string
}

const PhotoCardDetail = () => {

  const location = useLocation();
  const { photo } = location.state || {};
  const [player, setPlayer] = useState<Player | null>(null);

  const getPlayer = async () => {

    const params = { teamId: photo.team, backNumber: photo.no }

    try {
      const response = await axiosInstance.get(`/api-baseball/players/photos/${photo.team}/${photo.no}`, { params });
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

    const params = { id: photo.id }

    try {
      const response = await axiosInstance.delete(`/api-cardstore/cards/${photo.id}`, { params });
      console.log(response.data)
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  const deleteClick = () => {
    deletePlayer()
  }

  return (
    <>
      {player && (
        <CardDetail player={player} image={photo.imageUrl} onClick={deleteClick} />
      )}
  </>
  )
}

export default PhotoCardDetail