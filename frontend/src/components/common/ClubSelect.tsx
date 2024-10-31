import ClubSelectItem from "./ClubSelectItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import doosan from "../../assets/images/club/doosan_bears.svg";
import hanhwa from "../../assets/images/club/hanwha_eagles.svg";
import kia from "../../assets/images/club/kia_tigers.svg";
import kiwoom from "../../assets/images/club/kiwoom_heroes.svg";
import kt from "../../assets/images/club/kt_wiz.svg";
import lg from "../../assets/images/club/lg_twins.svg";
import lotte from "../../assets/images/club/lotte_giants.svg";
import nc from "../../assets/images/club/nc_dinos.svg";
import samsung from "../../assets/images/club/samsung_lions.svg";
import ssg from "../../assets/images/club/ssg_landers.svg";

const clubs: {
  logo: string;
  color: "doosan" | "hanhwa" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";
}[] = [
  { logo: doosan, color: "doosan" },
  { logo: hanhwa, color: "hanhwa" },
  { logo: kia, color: "kia" },
  { logo: kiwoom, color: "kiwoom" },
  { logo: kt, color: "kt" },
  { logo: lg, color: "lg" },
  { logo: lotte, color: "lotte" },
  { logo: nc, color: "nc" },
  { logo: samsung, color: "samsung" },
  { logo: ssg, color: "ssg" },
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
            <ClubSelectItem logo={club.logo} clubColor={club.color} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ClubSelect;
