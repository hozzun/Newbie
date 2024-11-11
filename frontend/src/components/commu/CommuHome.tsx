export interface CommuHomeProps {
  selectedTab: "free" | "trade";
  onTabClick: (tab: "free" | "trade") => void;
}

const CommuHome = ({ selectedTab, onTabClick }: CommuHomeProps) => {
  return (
    <>
      <div className="flex gap-4 font-kbogothicbold text-2xl mb-4">
        <button
          onClick={() => onTabClick("free")}
          className={`${selectedTab === "free" ? "text-green-900" : "text-gray-200"}`}
        >
          자유 게시글
        </button>
        <button
          onClick={() => onTabClick("trade")}
          className={`${selectedTab === "trade" ? "text-green-900" : "text-gray-200"}`}
        >
          중고거래
        </button>
      </div>
      <div className="flex gap-1 mb-2">
        <button className="inline-block px-3 py-1 text-sm font-kbogothiclight border border-green-900 bg-green-900 rounded-lg text-white">
          제목
        </button>
        <button className="inline-block px-3 py-1 text-sm font-kbogothiclight border border-green-900 rounded-lg text-green-900">
          작성자
        </button>
        <button className="inline-block px-3 py-1 text-sm font-kbogothiclight border border-green-900 rounded-lg text-green-900">
          태그
        </button>
      </div>
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Enter text here"
          className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-green-900"
        />
      </div>
    </>
  );
};

export default CommuHome;
