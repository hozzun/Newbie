interface BannerGreenProps {
  label?: string;
  onChange?: (value: string) => void;
}

const BannerGreen = ({ label }: BannerGreenProps) => {
  return (
    <div
      className="flex items-center justify-center bg-green-900 font-kbogothicmedium w-full h-12 m-3 rounded-full"
    >
      {label && <label className="text-white">{label}</label>}
    </div>
  );
};

export default BannerGreen;
