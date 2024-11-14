import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TabBar from "../../components/cardStore/TabBar";
import ClubSelect from "../../components/common/ClubSelect";
import PhotoCardComponent from "../../components/mypage/PhotoCard";
import axiosInstance from "../../util/axiosInstance";

interface PhotoCard {
  id: string
  no: string
  team: number
  imageUrl: string
  position: string
}

const PhotoCard = () => {

  const [photos, setPhotos] = useState<PhotoCard[]>([])
  const [count, setCount] = useState<number>(0)

  const tabBarOptions: Array<string> = ["투수", "내야수", "외야수", "포수"];

  const nav = useNavigate();

  const goCardDetail = (photo: PhotoCard) => {
    nav(`/mypage/photocard/${photo.id}`, { state: { no: photo.no, team: photo.team, image: photo.imageUrl } });
  };

  const getPhotoCard = async () => {

    // TODO: userId 수정
    const params = { userId: 5 }

    try {
      const response = await axiosInstance.get("/api-cardstore/cards/users", { params });
      setPhotos(response.data)
      setCount(response.data.length)
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      throw error;
    }
  };

  useEffect(() => {
    getPhotoCard();
  }, []);

  return (
    <>
      <ClubSelect />
      <div className="m-5">
        <TabBar
          options={tabBarOptions}
          selectedOption={tabBarOptions[0]}
          handleSelectOption={(value: string) => console.log(`tab bar: ${value}`)}
        />
        <p className="font-kbogothicmedium text-gray-700 my-5">총 {count}개</p>
        <div className="grid grid-cols-3 hover:cursor-pointer gap-4">
          {photos.map((photo) => (
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
