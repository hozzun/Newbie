interface ClubChangeProps {
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
  club: string;
}

const ClubChangeButton = ({ logo, clubColor, club }: ClubChangeProps) => {
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

  return (
    <div
      className={`flex box-border hover:box-content w-80 px-2 py-6 justify-evenly rounded-lg
       ${bgColorClass[clubColor]} transition-colors duration-300 shadow`}
    >
      <div className="justify-center content-center">
        <img src={logo} alt={`${clubColor} logo`} className="w-24 h-24" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-white font-kbogothicbold text-2xl">{club}</div>
        <div>버튼컴포넌트 자리</div>
      </div>
    </div>
  );
};

export default ClubChangeButton;
