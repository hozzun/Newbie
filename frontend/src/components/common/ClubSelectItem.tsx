import { useState } from "react";

interface ClubSelectProps {
  clubColor:
    | "doosan"
    | "hanhwa"
    | "kia"
    | "kiwoom"
    | "kt"
    | "lg"
    | "lotte"
    | "nc"
    | "samsung"
    | "ssg";
  logo: string;
  width?: string;
}

const ClubSelectItem = ({ logo, clubColor, width }: ClubSelectProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const bgColorClass = {
    doosan: "bg-club-doosan",
    hanhwa: "bg-club-hanhwa",
    kia: "bg-club-kia",
    kiwoom: "bg-club-kiwoom",
    kt: "bg-club-kt",
    lg: "bg-club-lg",
    lotte: "bg-club-lotte",
    nc: "bg-club-nc",
    samsung: "bg-club-samsung",
    ssg: "bg-club-ssg",
  };

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`flex box-border hover:box-content py-2 content-center justify-center rounded-lg ${
        isSelected ? bgColorClass[clubColor] : "bg-white"
      } transition-colors duration-300 shadow ${width}`}
      onClick={handleButtonClick}
    >
      <div className="justify-center content-center">
        <img src={logo} alt={`${clubColor} logo`} className="w-16 h-16" />
      </div>
    </div>
  );
};

export default ClubSelectItem;
