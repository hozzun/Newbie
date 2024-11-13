import { BUTTON_VARIANTS } from "./variants";
import Button from "./Button";

interface ClubChangeProps {
  clubColor:
    | "doosan"
    | "hanwha"
    | "kia"
    | "kiwoom"
    | "kt"
    | "lg"
    | "lotte"
    | "nc"
    | "samsung"
    | "ssg";
  logo: string;
  club: string;
  onClick?: () => void;
}

const ClubChangeButton = ({ logo, clubColor, club, onClick }: ClubChangeProps) => {
  const bgColorClass = {
    doosan: "bg-club-doosan",
    hanwha: "bg-club-hanwha",
    kia: "bg-club-kia",
    kiwoom: "bg-club-kiwoom",
    kt: "bg-club-kt",
    lg: "bg-club-lg",
    lotte: "bg-club-lotte",
    nc: "bg-club-nc",
    samsung: "bg-club-samsung",
    ssg: "bg-club-ssg",
  };

  return (
    <div
      className={`flex box-border w-[100%] px-2 py-6 justify-between rounded-lg
       ${bgColorClass[clubColor]} transition-colors duration-300 shadow`}
    >
      <div className="flex items-center justify-center">
        <img src={logo} alt={`${clubColor} logo`} className="w-[70%] h-[70%]" />
      </div>
      <div className="flex flex-col justify-center items-center mr-16">
        <div className="text-white font-kbogothicbold text-[21px] mb-2">{club}</div>
        <Button className="w-full px-12 whitespace-nowrap" variant={BUTTON_VARIANTS.white} onClick={onClick}>
          구단 바꾸기
        </Button>
      </div>
    </div>
  );
};

export default ClubChangeButton;
