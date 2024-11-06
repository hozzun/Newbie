import ClubLogos from "../../util/ClubLogos";

interface Club {
  id: string;
  imgSrc: string;
  name: string;
}

const clubs: Record<string, Club> = {
  kia: {
    id: "kia",
    name: "KIA 타이거즈",
    imgSrc: ClubLogos["kia"],
  },
  samsung: {
    id: "samsung",
    name: "삼성 라이온즈",
    imgSrc: ClubLogos["samsung"],
  },
  lg: {
    id: "lg",
    name: "LG 트윈스",
    imgSrc: ClubLogos["lg"],
  },
  doosan: {
    id: "doosan",
    name: "두산 베어스",
    imgSrc: ClubLogos["doosan"],
  },
  kt: {
    id: "kt",
    name: "KT 위즈",
    imgSrc: ClubLogos["kt"],
  },
  ssg: {
    id: "ssg",
    name: "SSG 랜더스",
    imgSrc: ClubLogos["ssg"],
  },
  lotte: {
    id: "lotte",
    name: "롯데 자이언츠",
    imgSrc: ClubLogos["ssg"],
  },
  hanhwa: {
    id: "hanwha",
    name: "한화 이글스",
    imgSrc: ClubLogos["hanwha"],
  },
  nc: {
    id: "nc",
    name: "NC 다이노스",
    imgSrc: ClubLogos["nc"],
  },
  kiwoom: {
    id: "kiwoom",
    name: "키움 히어로즈",
    imgSrc: ClubLogos["kiwoom"],
  },
};

export default clubs;
