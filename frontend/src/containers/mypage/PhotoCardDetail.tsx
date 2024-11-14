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
  const { no, team, image } = location.state || {};
  const [player, setPlayer] = useState<Player | null>(null);

  // TODO: 삭제 api 연결

  const getPlayer = async () => {

    const params = { teamId: team, backNumber: no }

    try {
      const response = await axiosInstance.get(`/api-baseball/players/photos/${team}/${no}`, { params });
      setPlayer(response.data)
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  useEffect(() => {
    getPlayer();
  }, []);

  const deleteClick = () => {
    console.log('선수 카드 삭제')
  }

  return (
    <>
      {player && (
        <CardDetail player={player} image={image} onClick={deleteClick} />
      )}
  </>
  )
}

export default PhotoCardDetail