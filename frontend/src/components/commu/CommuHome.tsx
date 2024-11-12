export interface CommuHomeProps {
  selectedTab: "free" | "trade";
  onTabClick: (tab: "free" | "trade") => void;
  selectedSearch: "title" | "writer" | "tag";
  onSearchClick: (search: "title" | "writer" | "tag") => void;
}

const CommuHomeComponent = ({
  selectedTab,
  onTabClick,
  selectedSearch,
  onSearchClick,
}: CommuHomeProps) => {
  return (
    <div className="mb-2">
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
        <button
          onClick={() => onSearchClick("title")}
          className={`inline-block px-2 py-1 text-sm font-kbogothiclight border border-green-900 rounded-lg ${
            selectedSearch === "title" ? "bg-green-900 text-white" : "text-green-900"
          }`}
        >
          제목
        </button>
        <button
          onClick={() => onSearchClick("writer")}
          className={`inline-block px-2 py-1 text-sm font-kbogothiclight border border-green-900 rounded-lg ${
            selectedSearch === "writer" ? "bg-green-900 text-white" : "text-green-900"
          }`}
        >
          작성자
        </button>
        <button
          onClick={() => onSearchClick("tag")}
          className={`inline-block px-2 py-1 text-sm font-kbogothiclight border border-green-900 rounded-lg ${
            selectedSearch === "tag" ? "bg-green-900 text-white" : "text-green-900"
          }`}
        >
          태그
        </button>
      </div>
      <div className="mx-auto">
        <input
          type="text"
          placeholder="검색어를 입력해 주세요"
          className="w-full px-4 py-4 border font-kbogothiclight border-gray-200 rounded-lg focus:outline-none focus:border-green-900"
        />
      </div>
    </div>
  );
};

export default CommuHomeComponent;