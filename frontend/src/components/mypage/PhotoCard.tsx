interface PhotoCardProps {
  imgSrc: string;
  onClick: () => void;
}

const PhotoCard = (props: PhotoCardProps) => {
  return (
      <div className="grid grid-cols-3 hover:cursor-pointer gap-4" onClick={props.onClick}>
        <img
          src={props.imgSrc}
          alt="선수카드"
          className="w-full h-auto rounded-lg"
        />
      </div>
  );
};

export default PhotoCard;
