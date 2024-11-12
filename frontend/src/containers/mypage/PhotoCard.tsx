import { useNavigate } from "react-router-dom";
import TabBar from "../../components/cardStore/TabBar";
import ClubSelect from "../../components/common/ClubSelect";
import PhotoCardComponent from "../../components/mypage/PhotoCard";
import Karina from "../../assets/images/karina.jpg";

const PhotoCard = () => {
  // TODO: 선수 카드 목록 불러오기

  const tabBarOptions: Array<string> = ["투수", "내야수", "외야수", "포수"];

  const nav = useNavigate();

  const goCardDetail = () => {
    nav("/mypage/photocard/:id");
  };

  return (
    <>
      <ClubSelect />
      <div className="m-5">
        <TabBar
          options={tabBarOptions}
          selectedOption={tabBarOptions[0]}
          handleSelectOption={(value: string) => console.log(`tab bar: ${value}`)}
        />
        <p className="font-kbogothicmedium text-gray-700 my-5">총 6개</p>
        <div className="grid grid-cols-3 hover:cursor-pointer gap-4">
          <PhotoCardComponent imgSrc={Karina} onClick={goCardDetail} />
          <PhotoCardComponent imgSrc={Karina} onClick={goCardDetail} />
          <PhotoCardComponent imgSrc={Karina} onClick={goCardDetail} />
          <PhotoCardComponent imgSrc={Karina} onClick={goCardDetail} />
          <PhotoCardComponent imgSrc={Karina} onClick={goCardDetail} />
          <PhotoCardComponent imgSrc={Karina} onClick={goCardDetail} />
        </div>
      </div>
    </>
  );
};

export default PhotoCard;
