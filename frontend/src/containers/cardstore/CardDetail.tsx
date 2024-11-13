import axios from "axios";
import CardDetailComponent from "../../components/cardStore/CardDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomError from "../../util/CustomError";
import ClubId from "../../util/ClubId";
import { GetPhotoCardPlayerInfoRequest, getPhotoCardPlayerInfo } from "../../api/baseballApi";
import { useEffect, useState } from "react";

export interface PlayerInfo {
  position: string;
  birth: string;
  physical: string;
  education: string;
}

const CardDetail = () => {
  const photoCardInfo = useSelector((state: RootState) => state.cardStore.photoCardInfo);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);

  const fetchPlayerInfos = async () => {
    try {
      if (!photoCardInfo) {
        throw new CustomError("[ERROR] 선수 포토카드 정보 없음 by card detail");
      }

      const getPhotoCardPlayerInfoRequest: GetPhotoCardPlayerInfoRequest = {
        teamId: ClubId[photoCardInfo.teamId],
        backNumber: photoCardInfo.backNumber,
      };
      const response = await getPhotoCardPlayerInfo(getPhotoCardPlayerInfoRequest);
      const playerInfoData: PlayerInfo = {
        position: response.data.position,
        birth: response.data.birth,
        physical: response.data.physical,
        education: response.data.academic,
      };

      setPlayerInfo(playerInfoData);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 선수 정보 없음 by card detail");
      } else {
        console.error(e);
      }
    }
  };

  const handleBuyPhotoCard = async () => {
    try {
      if (!photoCardInfo) {
        throw new CustomError("[ERROR] 선수 포토카드 정보 없음 by card detail");
      }

      console.log(`${photoCardInfo.id} 구매 시도`);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPlayerInfos();
  }, []);

  return (
    <CardDetailComponent
      photoCardInfo={photoCardInfo}
      playerInfo={playerInfo}
      handleBuyPhotoCard={handleBuyPhotoCard}
    />
  );
};

export default CardDetail;
