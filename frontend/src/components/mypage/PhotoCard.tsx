interface PhotoCardProps {
  imgSrc: string;
  onClick?: () => void;
}

const PhotoCard = (props: PhotoCardProps) => {
  return (
      <div className="hover:cursor-pointer" onClick={props.onClick}>
        <img
          src={props.imgSrc}
          alt="선수카드"
          className="w-full h-28 rounded-2xl mb-3"
        />
      </div>
  );
};

export default PhotoCard;
