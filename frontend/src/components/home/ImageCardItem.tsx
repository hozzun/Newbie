interface ImageCardItemProps {
  src: string | null;
  fallbackText: string;
  goMore: () => void;
}

const ImageCardItem = (props: ImageCardItemProps) => {
  return (
    <div
      className="flex items-center justify-center w-full aspect-[2/2.3] bg-white shadow-md rounded-lg overflow-hidden hover:cursor-pointer"
      onClick={props.goMore}
    >
      {props.src ? (
        <img src={props.src} alt="나의 선수 포토카드" className="w-full h-full object-cover" />
      ) : (
        <p className="text-base font-kbogothicmedium text-gray-700 w-[80%] text-center">
          {props.fallbackText}
        </p>
      )}
    </div>
  );
};

export default ImageCardItem;
