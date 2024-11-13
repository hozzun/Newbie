import ClubCarousel, { ClubCarouselProps } from "../common/ClubCarousel";

const OtherClubs = (props: ClubCarouselProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">다른 구단으로 이동하기</p>
      </div>
      <ClubCarousel {...props} />
    </div>
  );
};

export default OtherClubs;
