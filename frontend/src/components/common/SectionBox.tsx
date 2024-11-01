interface SectionBoxProps {
  label?: string;
}

const SectionBox = ({ label }: SectionBoxProps) => {

  return (
    <div className="flex items-center justify-center bg-white text-gray-700 font-kbogothicmedium w-full h-14">{label}</div>
  );
};

export default SectionBox;
