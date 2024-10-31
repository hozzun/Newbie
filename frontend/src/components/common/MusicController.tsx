const MusicController = () => {
  return (
    <div className="flex flex-col p-4 bg-gray-400 text-white rounded-2xl shadow-md w-[340px]">
      {/* 노래제목 및 컨트롤러 */}
      <div className="flex w-full">
        <div className="flex flex-col text-left px-2">
          <h2 className="font-kbogothicmedium text-lg">노래 제목</h2>
          <p className="font-kbogothiclight text-sm">가수 이름</p>
        </div>
        <div className="flex justify-end ml-auto">
          <button className="p-2 rounded-full">
            <img src="src/assets/images/icons/prev-play.png" alt="Pause Icon" className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-full hover:bg-black focus:outline-none">
            <img src="src/assets/images/icons/pause.png" alt="Pause Icon" className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full">
            <img src="src/assets/images/icons/next-play.png" alt="Pause Icon" className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* 진행바 */}
      <div className="w-full bg-white rounded-full h-1 mt-2">
        <div className="bg-black h-1 rounded-full" style={{ width: "30%" }}></div>
      </div>
    </div>
  );
};

export default MusicController;
