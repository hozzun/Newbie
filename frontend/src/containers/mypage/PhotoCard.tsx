import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TabBar from "../../components/cardStore/TabBar";
import ClubSelect from "../../components/common/ClubSelect";
import PhotoCardComponent from "../../components/mypage/PhotoCard";
import axiosInstance from "../../util/axiosInstance";

interface PhotoCard {
  id: string;
  no: string;
  team: number;
  imageUrl: string;
  position: string;
}

const PhotoCard = () => {
  const [photos, setPhotos] = useState<PhotoCard[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>("투수");

  const tabBarOptions: Array<string> = ["투수", "내야수", "외야수", "포수"];

  const nav = useNavigate();

  const goCardDetail = (photo: PhotoCard) => {
    console.log("정보", photo);
    nav(`/mypage/photocard/${photo.id}`, { state: photo });
  };

  const getPhotoCard = async () => {
    // TODO: userId 수정
    const params = { userId: 5 };

    try {
      const response = await axiosInstance.get("/api-cardstore/cards/users", { params });
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
  const filteredPhotos = photos.filter(photo => photo.position === selectedPosition);

  return (
    <>
      <ClubSelect />
      <div className="m-5">
        <TabBar
          options={tabBarOptions}
          selectedOption={selectedPosition} // 현재 선택된 포지션 전달
          handleSelectOption={(value: string) => setSelectedPosition(value)} // 선택 시 상태 업데이트
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
