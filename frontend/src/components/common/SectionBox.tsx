import AngleLeft from "../../assets/icons/angle-left.svg?react";
import { useNavigate } from "react-router-dom";

interface SectionBoxProps {
  label?: string;
}

const SectionBox = ({ label }: SectionBoxProps) => {
  const nav = useNavigate();

  // const onClick = () => {console.log('클릭')}

  return (
    <div className="max-w-[600px] min-w-[320px] mx-auto flex items-center bg-white text-gray-700 font-kbogothicmedium w-full h-14">
      <AngleLeft
        className="w-5 h-5 text-gray-700 ml-3"
        onClick={() => {
          nav(-1);
        }}
      />
      <label className="flex-grow text-center mr-3">{label}</label>
    </div>
  );
};

export default SectionBox;
