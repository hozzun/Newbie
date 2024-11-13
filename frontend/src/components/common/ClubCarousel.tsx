import { useState } from "react";
import ClubLogos from "../../util/ClubLogos";
import Carousel from "./Carousel";

export interface ClubCarouselProps {
  selectedItem: string;
  handleClickItem: (value: string) => void;
}

interface ClubCarouselItemProps {
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

const ClubCarouselItem = (props: ClubCarouselItemProps) => {
  const clubCarouselItemClass = `flex box-border hover:box-content py-2 m-0.5 content-center justify-center rounded-lg transition-colors duration-300 shadow-sm ${props.isSelected ? clubColors[props.clubId] : "bg-gray-100"}`;

  return (
    <div className={clubCarouselItemClass} onClick={props.onClick}>
      <img
        src={ClubLogos[props.clubId]}
        alt={props.clubId}
        className="min-w-10 min-h-10 max-w-12 max-h-12"
        draggable="false"
      />
    </div>
  );
};

const ClubCarousel = (props: ClubCarouselProps) => {
  const [selectedItem, setSelectedItem] = useState<string>(props.selectedItem);

  const handleSelectItem = (value: string) => {
    setSelectedItem(value);
    props.handleClickItem(value);
  };

  return (
    <Carousel
      itemCount={5}
      items={Object.keys(clubColors)}
      renderItem={item => (
        <ClubCarouselItem
          clubId={item}
          isSelected={item === selectedItem}
          onClick={() => handleSelectItem(item)}
        />
      )}
      isIndexChanged={true}
      firstIndex={Object.keys(clubColors).findIndex(key => key === selectedItem)}
    />
  );
};

export default ClubCarousel;
