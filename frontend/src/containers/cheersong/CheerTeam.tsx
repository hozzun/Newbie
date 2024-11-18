import ClubSelectItem from "../../components/cheerteam/ClubSelectItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dialog from "../../components/common/Dialog";

const CheerTeam = () => {
  const [selectedClub, setSelectedClub] = useState<string>("");
  const nav = useNavigate();
  const [show, setShow] = useState<boolean>(false)

  const goCheerSong = () => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
      nav("/cheersong", { state: { selectedClub } });
    }, 2000)
  };

  return (
    <div className="flex flex-col justify-center">
      <label className="font-kbogothicbold text-2xl text-gray-600 m-5">
        어떤 팀을 응원하시나요?
      </label>
      <div className="mt-5">
        <ClubSelectItem onClick={goCheerSong} onSelectClub={setSelectedClub} />
      </div>
      {show && <Dialog title="구단 변경" body="구단 변경 중입니다! 잠시만 기다려주세요⚾" />}
    </div>
  );
};

export default CheerTeam;
