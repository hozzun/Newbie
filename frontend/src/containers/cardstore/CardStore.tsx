import axios from "axios";
import CardStoreComponent from "../../components/cardStore/CardStore";
import { useEffect, useRef, useState } from "react";
import { GetPhotoCardsRequest, getPhotoCards } from "../../api/cardStoreApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ClubId, { getClubIdByNum } from "../../util/ClubId";
import { setCardStoreListItem } from "../../redux/cardStoreSlice";
import { ClubCarouselProps } from "../../components/common/ClubCarousel";

export interface PhotoCardInfo {
  id: string;
  title: string;
  imageUrl: string;
  name: string;
  teamId: string;
  backNumber: string;
  price: number;
}

const sortItem: Record<string, string> = {
  가나다순: "DEFAULT",
  최신순: "LATEST",
  판매순: "SALES",
};

const CardStore = () => {
  const dispatch = useDispatch();

  const cardStoreListItem = useSelector((state: RootState) => state.cardStore.cardStoreListItem);
  const { cheeringClub } = useSelector((state: RootState) => state.team);

  const [selectedClubOption, setSelectedClubOption] = useState<string>(
    cardStoreListItem.club === ""
      ? getClubIdByNum(cheeringClub ? (cheeringClub > 0 ? cheeringClub : 1) : 1)
      : cardStoreListItem.club,
  );
  const [selectedPositionOption, setSelectedPositionOption] = useState<string>(
    cardStoreListItem.position,
  );
  const [selectedSortOption, setSelectedSortOption] = useState<string>(cardStoreListItem.sort);
  const [isVisibleBoughtCard, setIsVisibleBoughtCard] = useState<boolean>(
    cardStoreListItem.isVisibleBoughtCard,
  );
  const [photoCardInfos, setPhotoCardInfos] = useState<Array<PhotoCardInfo> | null>(null);

  const isFirstRender = useRef<boolean>(true);

  const fetchPhotoCardInfos = async () => {
    try {
      const getPhotoCardsRequest: GetPhotoCardsRequest = {
        team: ClubId[selectedClubOption],
        position: selectedPositionOption,
        sortType: selectedSortOption === "" ? sortItem["가나다순"] : sortItem[selectedSortOption],
        includeCard: isVisibleBoughtCard,
      };
      const response = await getPhotoCards(getPhotoCardsRequest);
      const photoCardInfoDatas: Array<PhotoCardInfo> = response.data.map(d => {
        return {
          id: d.id,
          title: "2024",
          imageUrl: d.imageUrl,
          name: d.name,
          teamId: getClubIdByNum(d.team),
          backNumber: d.no,
          price: d.price,
        };
      });

      setPhotoCardInfos(photoCardInfoDatas);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        console.log("[INFO] 카드 정보 없음 by card store");
        setPhotoCardInfos([]);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchPhotoCardInfos();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchPhotoCardInfos();

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

  const handleSelectClubOption = (value: string) => {
    setSelectedClubOption(value);

    setPhotoCardInfos(null);
  };

  const handleSelectPositionOption = (value: string) => {
    setSelectedPositionOption(value);

    setPhotoCardInfos(null);
  };

  const handleSelectSortOption = (value: string) => {
    setSelectedSortOption(value);

    setPhotoCardInfos(null);
  };

  const handleIsVisibleBoughtCard = () => {
    setIsVisibleBoughtCard(!isVisibleBoughtCard);

    setPhotoCardInfos(null);
  };

  const clubCarouselProps: ClubCarouselProps = {
    selectedItem: selectedClubOption,
    handleClickItem: handleSelectClubOption,
  };

  return (
    <CardStoreComponent
      clubCarouselProps={clubCarouselProps}
      selectedPositionOption={selectedPositionOption}
      handleSelectPositionOption={handleSelectPositionOption}
      selectedSortOption={selectedSortOption}
      handleSelectSortOption={handleSelectSortOption}
      isVisibleBoughtCard={isVisibleBoughtCard}
      handleIsVisibleBoughtCard={handleIsVisibleBoughtCard}
      photoCardInfos={photoCardInfos}
    />
  );
};

export default CardStore;
