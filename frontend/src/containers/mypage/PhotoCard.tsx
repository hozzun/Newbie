import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TabBar from "../../components/cardStore/TabBar";
import ClubEmblaCarousel from "../../components/common/ClubEmblaCarousel";
import PhotoCardComponent from "../../components/mypage/PhotoCard";
import axiosInstance from "../../util/axiosInstance";
import ClubId, { getIdByNum } from "../../util/ClubId";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setSelectedPosition, setTeam } from "../../redux/myPhotoCardSlice";

interface PhotoCard {
  id: string;
  no: string;
  team: number;
  imageUrl: string;
  position: string;
}

const PhotoCard = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [photos, setPhotos] = useState<PhotoCard[]>([]);
  const selectedClub = useSelector((state: RootState) => state.myPhotoCard.team)
  const selectedPosition = useSelector((state: RootState) => state.myPhotoCard.selectedPosition);
  const { cheeringClub } = useSelector((state: RootState) => state.team);

  const clubName = getIdByNum(selectedClub);

  const tabBarOptions: Array<string> = ["투수", "내야수", "외야수", "포수"];

  const handleClubChange = (clubColor: string) => {
    const teamNumber = ClubId[clubColor]
    dispatch(setTeam(teamNumber)); // Redux store에 팀 번호 저장
  };

  const handlePositionChange = (position: string) => {
    dispatch(setSelectedPosition(position));
  };

  const goCardDetail = (photo: PhotoCard) => {
    nav(`/mypage/photocard/${photo.id}`, { state: photo });
  };

  const getPhotoCard = async () => {

    try {
      const response = await axiosInstance.get("/api/v1/cardstore/cards/users");
      setPhotos(response.data);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  useEffect(() => {
    getPhotoCard();
  }, []);

  // 선택된 포지션의 카드만
  const filteredPhotos = photos.filter(photo => {
    const teamName = getIdByNum(photo.team);
    return photo.position === selectedPosition && teamName === clubName;
  });

  return (
    <>
      {cheeringClub && <ClubEmblaCarousel selectedItem={clubName ?? getIdByNum(cheeringClub) ?? ""} handleClickItem={handleClubChange} />}
      <div className="m-5">
        <TabBar
          options={tabBarOptions}
          selectedOption={selectedPosition} // 현재 선택된 포지션 전달
          handleSelectOption={handlePositionChange} // 선택 시 상태 업데이트
        />
        {filteredPhotos.length !== 0 ? (
          <p className="font-kbogothicmedium text-gray-700 my-5">총 {filteredPhotos.length}개</p>
        ) : (
          <p className="font-kbogothicmedium text-gray-700 flex justify-center items-center mt-10">
            아직 구입한 포토카드가 없습니다.
          </p>
        )}
        <div className="grid grid-cols-3 hover:cursor-pointer gap-4">
          {filteredPhotos.map(photo => (
            <PhotoCardComponent
              key={photo.id}
              imgSrc={photo.imageUrl}
              onClick={() => goCardDetail(photo)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PhotoCard;
