import axios from "axios";
import CardStoreComponent from "../../components/cardStore/CardStore";
import { useEffect, useRef, useState } from "react";
import { GetPhotoCardsRequest, getPhotoCards } from "../../api/cardStoreApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ClubId from "../../util/ClubId";
import { setCardStoreListItem } from "../../redux/cardStoreSlice";

export interface PhotoCardInfo {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

// TODO: 정렬 기준 추가
const sortItem: Record<string, string> = {
  가나다순: "DEFAULT",
  최신순: "LATEST",
  판매순: "SALES",
};

const CardStore = () => {
  const dispatch = useDispatch();

  const cardStoreListItem = useSelector((state: RootState) => state.cardStore.cardStoreListItem);

  // TODO: 캐러셀로 구단 ID 지정하기
  // TODO: 사용자 응원 구단으로 지정하기
  const [selectedClubOption, setSelectedClubOption] = useState<string>(
    cardStoreListItem.club === "" ? "kia" : cardStoreListItem.club,
  );
  // TODO: 카드 목록 조회 시 포지션도 반영
  const [selectedPositionOption, setSelectedPositionOption] = useState<string>(
    cardStoreListItem.position,
  );
  const [selectedSortOption, setSelectedSortOption] = useState<string>(cardStoreListItem.sort);
  const [isVisibleBoughtCard, setIsVisibleBoughtCard] = useState<boolean>(
    cardStoreListItem.isVisibleBoughtCard,
  );
  const [photoCards, setPhotoCards] = useState<Array<PhotoCardInfo> | null>(null);

  const isFirstRender = useRef<boolean>(true);

  const fetchPhotoCards = async () => {
    try {
      const getPhotoCardsRequest: GetPhotoCardsRequest = {
        team: ClubId[selectedClubOption],
        sortType: selectedSortOption === "" ? sortItem["가나다순"] : sortItem[selectedSortOption],
        includeCard: isVisibleBoughtCard,
      };
      const response = await getPhotoCards(getPhotoCardsRequest);
      const photoCardDatas: Array<PhotoCardInfo> = response.data.map(d => {
        return {
          id: d.id,
          imageUrl: d.imageUrl,
          name: d.name,
          price: d.price,
        };
      });

      setPhotoCards(photoCardDatas);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 선수 정보 없음 by player list");
        setPhotoCards([]);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchPhotoCards();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchPhotoCards();

    return () => {
      dispatch(
        setCardStoreListItem({
          club: selectedClubOption,
          position: selectedPositionOption,
          sort: selectedSortOption,
          isVisibleBoughtCard: isVisibleBoughtCard,
        }),
      );
    };
  }, [selectedClubOption, selectedPositionOption, selectedSortOption, isVisibleBoughtCard]);

  const handleSelectPositionOption = (value: string) => {
    setSelectedPositionOption(value);

    setPhotoCards(null);
  };

  const handleSelectSortOption = (value: string) => {
    setSelectedSortOption(value);

    setPhotoCards(null);
  };

  const handleIsVisibleBoughtCard = () => {
    setIsVisibleBoughtCard(!isVisibleBoughtCard);

    setPhotoCards(null);
  };

  return (
    <CardStoreComponent
      selectedPositionOption={selectedPositionOption}
      handleSelectPositionOption={handleSelectPositionOption}
      selectedSortOption={selectedSortOption}
      handleSelectSortOption={handleSelectSortOption}
      isVisibleBoughtCard={isVisibleBoughtCard}
      handleIsVisibleBoughtCard={handleIsVisibleBoughtCard}
      photoCards={photoCards}
    />
  );
};

export default CardStore;
