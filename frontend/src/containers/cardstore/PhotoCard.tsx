import { useNavigate } from "react-router-dom";
import PhotoCardComponent from "../../components/cardStore/PhotoCard";
import { PhotoCardInfo } from "./CardStore";

interface PhotoCardProps {
  photoCard: PhotoCardInfo;
}

const PhotoCard = (props: PhotoCardProps) => {
  const nav = useNavigate();

  const goDetail = () => {
    nav(`/cardstore/${props.photoCard.id}`);
  };

  return <PhotoCardComponent photoCard={props.photoCard} onClick={goDetail} />;
};

export default PhotoCard;
