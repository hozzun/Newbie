import ClubSelectItem from "../../components/cheerteam/ClubSelectItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CheerTeam = () => {
  const [selectedClub, setSelectedClub] = useState<string>(""); // 선택된 클럽을 상태로 저장
  const nav = useNavigate();

  const goCheerSong = () => {
    console.log("Selected Club:", selectedClub);
    nav("/cheersong", { state: { selectedClub } });
  };

  return (
    <div className="flex flex-col justify-center">
      <label className="font-kbogothicbold text-2xl text-gray-600 m-5">
        어떤 팀을 응원하시나요?
      </label>
      <div className="mt-5">
        <ClubSelectItem onClick={goCheerSong} onSelectClub={setSelectedClub} />
      </div>
    </div>
  );
};

export default CheerTeam;
