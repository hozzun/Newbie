import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import IntroCarousel from "../../components/intro/IntroCarousel";
import Button from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import Slider from "react-slick";

export interface IntroProps {
  goNext: () => void;
}

const Intro = (props: IntroProps) => {
  const sliderRef = useRef<Slider>(null);
  // const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleButtonClick = () => {
    if (currentSlide === 2) {
      // 마지막 슬라이드 인덱스 확인
      props.goNext();
    } else {
      handleNextSlide(); // 다음 슬라이드로 이동
    }
  };

  return (
    <div>
      <IntroCarousel ref={sliderRef} onSlideChange={handleSlideChange} />
      <Button
        variant={BUTTON_VARIANTS.primary}
        onClick={handleButtonClick}
        className="w-full mt-[10%] mb-8"
      >
        {currentSlide === 2 ? "시작하기" : "다음"} {/* 버튼 텍스트 변경 */}
      </Button>
    </div>
  );
};

export default Intro;
