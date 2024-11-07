import MusicController from "../common/MusicController";

const PlayerMusicController = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full mb-3">
        <p className="text-2xl font-kbogothicbold text-gray-700">응원가</p>
      </div>
      <MusicController />
    </div>
  );
};

export default PlayerMusicController;
