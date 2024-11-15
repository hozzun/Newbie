interface PhotoCardProps {
  className?: string;
  imgSrc: string;
  onClick?: () => void;
}

const PhotoCard = (props: PhotoCardProps) => {
  return (
      <div onClick={props.onClick}>
        <img
          src={props.imgSrc}
          alt="선수카드"
        />
      </div>
  );
};

export default PhotoCard;
