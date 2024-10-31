import ClubSelectItem from "./ClubSelectItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import clubLogos from "../../util/clubLogos";

const clubs: {
  color: "doosan" | "hanhwa" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";
}[] = [
  { color: "doosan" },
  { color: "hanhwa" },
  { color: "kia" },
  { color: "kiwoom" },
  { color: "kt" },
  { color: "lg" },
  { color: "lotte" },
  { color: "nc" },
  { color: "samsung" },
  { color: "ssg" },
];

const ClubSelect = () => {
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
              logo={clubLogos[club.color]} // clubLogos 객체에서 로고 가져오기
              clubColor={club.color}
              width="w-32"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ClubSelect;
