import doosan from "../../assets/images/club/doosan_bears.svg";
import { useState } from "react";

interface ClubSelectProps {
  clubColor?:
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
}

const ClubSelectItem = ({ clubColor = "doosan" }: ClubSelectProps) => {
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
      className={`flex box-border hover:box-content w-24 py-2 content-center justify-center rounded-lg ${
        isSelected ? bgColorClass[clubColor] : "bg-white"
      } transition-colors duration-300 shadow`}
      onClick={handleButtonClick}
    >
      <div className="justify-center content-center">
        <img src={doosan} alt="구단로고" className="w-16 h-16" />
      </div>
    </div>
  );
};

export default ClubSelectItem;
