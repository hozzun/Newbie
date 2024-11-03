import ImageCardItem from "./ImageCardItem";

export interface ImageCardProps {
  photoCardImage: string | null;
  watchedGameImage: string | null;
  goPhotoCardMore: () => void;
  goWatchedGameMore: () => void;
}

const ImageCard = (props: ImageCardProps) => {
  return (
    <div className="flex justify-between space-x-8 w-[98%] mt-8">
      <ImageCardItem
        src={props.photoCardImage}
        fallbackText="포토카드를 모아보세요"
        goMore={props.goPhotoCardMore}
      />
      <ImageCardItem
        src={props.watchedGameImage}
        fallbackText="직관 경기 사진을 모아보세요"
        goMore={props.goWatchedGameMore}
      />
    </div>
  );
};

export default ImageCard;
