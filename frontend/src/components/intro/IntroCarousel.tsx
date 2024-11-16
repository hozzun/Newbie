import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import IntroSlideItem from "./IntroSlideItem";
import INTRO_1 from "../../assets/images/intro/intro1.png";
import INTRO_2 from "../../assets/images/intro/intro2.png";
import INTRO_3 from "../../assets/images/intro/intro3.png";

interface SlideData {
  imgSrc: string;
  text1: string;
  text2: string;
}

interface IntroCarouselProps {
  onSlideChange: (index: number) => void;
}

// Slider 메서드들을 위한 ref 타입 정의
export interface CarouselRef {
  EmblaNext: () => void;
  EmblaPrev: () => void;
  EmblaGoTo: (slide: number) => void;
}

const slides: SlideData[] = [
  {
    imgSrc: INTRO_1,
    text1: "야구 어렵지 않아요",
    text2: "복잡해 보이는 야구도 뉴비와 함께라면 쉽고 재미있게 배울 수 있습니다",
  },
  {
    imgSrc: INTRO_2,
    text1: "당신만의 야구 경험",
    text2: "경기일정, 경기직관 기록, 응원가 듣기 등의 서비스를 경험하세요!",
  },
  {
    imgSrc: INTRO_3,
    text1: "함께 즐기는 야구 커뮤니티",
    text2:
      "같은 팀을 응원하는 팬들과의 소통! 하이라이트 영상, 굿즈 거래까지 한 곳에서 즐길 수 있습니다",
  },
];

const IntroCarousel = forwardRef<CarouselRef, IntroCarouselProps>(({ onSlideChange }, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
  });

  // 현재 슬라이드 변경 감지
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    onSlideChange(emblaApi.selectedScrollSnap());
  }, [emblaApi, onSlideChange]);

  // emblaApi가 준비되면 이벤트 리스너 등록
  React.useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // ref를 통해 외부에서 사용할 수 있는 메서드들 정의
  useImperativeHandle(ref, () => ({
    EmblaNext: () => emblaApi?.scrollNext(),
    EmblaPrev: () => emblaApi?.scrollPrev(),
    EmblaGoTo: (slide: number) => emblaApi?.scrollTo(slide),
  }));

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div className="flex-[0_0_100%]" key={index}>
            <IntroSlideItem imgSrc={slide.imgSrc} text1={slide.text1} text2={slide.text2} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default IntroCarousel;
