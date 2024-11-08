interface SlideItemProps {
  imgSrc: string;
  text1: string;
  text2: string;
}

const IntroSlideItem = ({ imgSrc, text1, text2 }: SlideItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 text-center px-8 my-[10%]">
      <img
        src={imgSrc}
        alt={text1}
        className="w-full max-w-[80%] h-auto object-contain rounded-lg"
      />
      <div className="text-4xl font-kbogothicbold mt-[10%]">{text1}</div>
      <div className="text-2lg text-gray-500 font-kbogothicmedium mb-[30%]">{text2}</div>{" "}
      {/* 텍스트 크기 증가 */}
    </div>
  );
};

export default IntroSlideItem;
