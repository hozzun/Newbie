import AngleLeft from "../../assets/icons/angle-left.svg?react";

interface SectionBoxProps {
  label?: string;
  onClick?: () => void;
}

const SectionBox = ({ label, onClick }: SectionBoxProps) => {
  return (
    <div className="max-w-[600px] min-w-[320px] mx-auto flex items-center bg-white text-gray-700 font-kbogothicmedium w-full h-14">
      <AngleLeft className="w-5 h-5 text-gray-700 ml-3" onClick={onClick} />
      <label className="flex-grow text-center mr-3">{label}</label>
    </div>
  );
};

export default SectionBox;
