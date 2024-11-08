import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { forwardRef } from "react";
import Slider from "react-slick";
import IntroSlideItem from "./IntroSlideItem";
import LOGO from "../../assets/images/karina.jpg";

interface SlideData {
  imgSrc: string;
  text1: string;
  text2: string;
}

interface IntroCarouselProps {
  onSlideChange: (index: number) => void;
}

const slides: SlideData[] = [
  {
    imgSrc: LOGO,
    text1: "야구 어렵지 않아요",
    text2: "야구라 하면 너무 어렵게 생각하는데 누구나 쉽게 야구를 즐기실 수 있습니다",
  },
  {
    imgSrc: LOGO,
    text1: "야구 어렵지 않아요",
    text2: "야구라 하면 너무 어렵게 생각하는데 누구나 쉽게 야구를 즐기실 수 있습니다",
  },
  {
    imgSrc: LOGO,
    text1: "야구 어렵지 않아요",
    text2: "야구라 하면 너무 어렵게 생각하는데 누구나 쉽게 야구를 즐기실 수 있습니다",
  },
];

const IntroCarousel = forwardRef<Slider, IntroCarouselProps>(({ onSlideChange }, ref) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => onSlideChange(current),
  };

  return (
    <Slider ref={ref} {...settings}>
      {slides.map((slide, index) => (
        <IntroSlideItem key={index} imgSrc={slide.imgSrc} text1={slide.text1} text2={slide.text2} />
      ))}
    </Slider>
  );
});

export default IntroCarousel;
