import { useNavigate } from "react-router-dom";
import PhotoCardComponent from "../../components/cardStore/PhotoCard";
import { PhotoCardInfo } from "./CardStore";
import { useDispatch } from "react-redux";
import { setPhotoCardInfo } from "../../redux/cardStoreSlice";

interface PhotoCardProps {
  photoCardInfo: PhotoCardInfo;
}

const PhotoCard = (props: PhotoCardProps) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const goDetail = () => {
    dispatch(setPhotoCardInfo(props.photoCardInfo));

    nav(`/cardstore/${props.photoCardInfo.id}`);
  };

  return <PhotoCardComponent photoCardInfo={props.photoCardInfo} onClick={goDetail} />;
};

export default PhotoCard;
