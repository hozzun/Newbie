import React from "react";
import useEmblaCarousel from "embla-carousel-react";

type CarouselProps = {
  slides: string[];
  options?: Parameters<typeof useEmblaCarousel>[0];
};

const EmblaCarousel: React.FC<CarouselProps> = ({ slides, options }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, ...options });

  return (
    <div className="overflow-hidden w-full rounded-lg border-gray-300" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div className="flex-shrink-0 w-full relative" key={index}>
            <img
              className="w-full h-auto object-cover rounded-lg"
              src={slide}
              alt={`Slide ${index + 1}`}
            />
            <span
              className="absolute bottom-2 right-4 text-white text-xs underline cursor-pointer"
              onClick={() => window.open(slide)}
            >
              자세히보기
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
