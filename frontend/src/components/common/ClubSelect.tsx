import ClubSelectItem from "./ClubSelectItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import ClubLogos from "../../util/ClubLogos";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getIdByNum } from "../../util/ClubId";

const clubs: {
  color: "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";
}[] = [
  { color: "doosan" },
  { color: "hanwha" },
  { color: "kia" },
  { color: "kiwoom" },
  { color: "kt" },
  { color: "lg" },
  { color: "lotte" },
  { color: "nc" },
  { color: "samsung" },
  { color: "ssg" },
];

interface ClubSelectProps {
  page?: string;
  onSelectClub?: (clubColor: string) => void;
}

const ClubSelect = ({ page, onSelectClub }: ClubSelectProps) => {
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const { team } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    if (page === "photocard") {
      const teamEnglish = getIdByNum(team);
      setSelectedClub(teamEnglish);
    }
  }, []);

  const handleSelect = (clubColor: string) => {
    setSelectedClub(clubColor);
    if (onSelectClub) {
      onSelectClub(clubColor);
    }
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40px",
    slidesToShow: 3,
    speed: 500,
  };

  return (
    <div>
      <Slider {...settings}>
        {clubs.map((club, index) => (
          <div key={index}>
            <ClubSelectItem
              logo={ClubLogos[club.color]} // clubLogos 객체에서 로고 가져오기
              clubColor={club.color}
              width="w-24"
              isSelected={selectedClub === club.color}
              onSelect={() => handleSelect(club.color)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ClubSelect;
