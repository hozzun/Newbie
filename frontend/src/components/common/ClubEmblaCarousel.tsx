import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClubLogos from "../../util/ClubLogos";

export interface ClubEmblaCarouselProps {
  selectedItem: string;
  handleClickItem: (value: string) => void;
}

interface ClubEmblaCarouselItemProps {
  clubId: string;
  isSelected: boolean;
  onClick: () => void;
}

const clubColors: Record<string, string> = {
  kia: "bg-club-kia",
  samsung: "bg-club-samsung",
  lg: "bg-club-lg",
  doosan: "bg-club-doosan",
  kt: "bg-club-kt",
  ssg: "bg-club-ssg",
  lotte: "bg-club-lotte",
  hanwha: "bg-club-hanwha",
  nc: "bg-club-nc",
  kiwoom: "bg-club-kiwoom",
};

const ClubEmblaCarouselItem: React.FC<ClubEmblaCarouselItemProps> = ({
  clubId,
  isSelected,
  onClick,
}) => {
  const clubCarouselItemClass = `flex box-border hover:box-content py-2 m-0.5 content-center justify-center rounded-lg transition-colors duration-300 shadow-sm ${
    isSelected ? clubColors[clubId] : "bg-gray-100"
  }`;

  return (
    <div className={clubCarouselItemClass} onClick={onClick}>
      <img
        src={ClubLogos[clubId]}
        alt={clubId}
        className="min-w-10 min-h-10 max-w-12 max-h-12"
        draggable="false"
      />
    </div>
  );
};

const ClubEmblaCarousel: React.FC<ClubEmblaCarouselProps> = ({ selectedItem, handleClickItem }) => {
  const [selected, setSelected] = useState<string>(selectedItem);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    containScroll: "keepSnaps",
    dragFree: true,
    startIndex: Object.keys(clubColors).findIndex(key => key === selectedItem),
  });

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(Object.keys(clubColors).findIndex(key => key === selectedItem));
    }
  }, [emblaApi, selectedItem]);

  const handleSelectItem = useCallback(
    (value: string) => {
      setSelected(value);
      handleClickItem(value);
      if (emblaApi) {
        emblaApi.scrollTo(Object.keys(clubColors).findIndex(key => key === value));
      }
    },
    [handleClickItem, emblaApi],
  );

  return (
    <div className="overflow-hidden w-full rounded-lg border-gray-300" ref={emblaRef}>
      <div className="flex gap-2">
        {Object.keys(clubColors).map(clubId => (
          <div className="flex-[0_0_calc(20%-8px)]" key={clubId}>
            <ClubEmblaCarouselItem
              clubId={clubId}
              isSelected={clubId === selected}
              onClick={() => handleSelectItem(clubId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubEmblaCarousel;
