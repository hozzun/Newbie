import axios from "axios";
import CardDetailComponent from "../../components/cardStore/CardDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomError from "../../util/CustomError";
import ClubId from "../../util/ClubId";
import { GetPhotoCardPlayerInfoRequest, getPhotoCardPlayerInfo } from "../../api/baseballApi";
import { useEffect, useState } from "react";
import { getBuyPhotoCard } from "../../api/cardStoreApi";

export interface PlayerInfo {
  position: string;
  birth: string;
  physical: string;
  education: string;
}

const CardDetail = () => {
  const photoCardInfo = useSelector((state: RootState) => state.cardStore.photoCardInfo);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [isBuySuccess, setIsBuySuccess] = useState<boolean>(false);
  const [isVisibleResult, setIsVisibleResult] = useState<boolean>(false);

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

      const response = await getBuyPhotoCard({ cardId: photoCardInfo.id });
      if (response.status === 200) {
        setIsBuySuccess(true);
        setIsVisibleResult(true);
        setTimeout(() => {
          setIsVisibleResult(false);
        }, 3000);
      }
    } catch (e) {
      console.log(e);
      setIsBuySuccess(false);
      setIsVisibleResult(false);
      setTimeout(() => {
        setIsVisibleResult(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchPlayerInfos();
  }, []);

  return (
    <CardDetailComponent
      photoCardInfo={photoCardInfo}
      playerInfo={playerInfo}
      isBuySuccess={isBuySuccess}
      isVisibleResult={isVisibleResult}
      handleBuyPhotoCard={handleBuyPhotoCard}
    />
  );
};

export default CardDetail;
