import { useEffect, useRef, useState } from "react";
import registDragEvent from "../../util/registDragEvent";
import PlayerRecordItem, { PlayerRecordItemProps } from "./PlayerRecordItem";

interface useCarouselSizeProps {
  aspectRadio?: number;
}

interface CarouselProps {
  itemCount: number;
  items: Array<PlayerRecordItemProps>;
}

function useCarouselSize({ aspectRadio = 1 }: useCarouselSizeProps = { aspectRadio: 1 }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [{ width, height }, setCarouselSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (!carouselRef.current) return;

      const carouselRect = carouselRef.current.getBoundingClientRect();
      setCarouselSize({
        width: carouselRect.width,
        height: carouselRect.width * aspectRadio,
      });
    };

    // 초기 크기 설정
    updateSize();

    // 윈도우 크기 변경 시 리사이즈 처리
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [aspectRadio]);

  return {
    ref: carouselRef,
    width,
    height,
  };
}

const PlayerCarousel = (props: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  const { ref, width } = useCarouselSize({ aspectRadio: 1 });

  const inrange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;

    return v;
  };

  const itemWidth = width / props.itemCount;

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <div
        className="flex"
        style={{
          transform: `translateX(${-currentIndex * itemWidth + transX}px)`,
          transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
        }}
        {...registDragEvent({
          onDragChange: deltaX => {
            setTransX(inrange(deltaX, -itemWidth, itemWidth));
          },
          onDragEnd: deltaX => {
            const maxIndex = Math.max(0, props.items.length - props.itemCount);
            const count = Math.min(props.itemCount, Math.trunc(Math.abs(deltaX) / 100));

            if (deltaX < -100) setCurrentIndex(inrange(currentIndex + count, 0, maxIndex));
            if (deltaX > 100) setCurrentIndex(inrange(currentIndex - count, 0, maxIndex));

            setTransX(0);
          },
        })}
      >
        {props.items.map((item, index) => (
          <div key={index} className="flex-shrink-0 pr-2" style={{ width: itemWidth }}>
            <PlayerRecordItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerCarousel;
