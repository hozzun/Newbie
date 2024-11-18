import SearchIcon from "../../assets/icons/search.svg?react";

export interface CommuHomeProps {
  selectedTab: "free" | "trade";
  onTabClick: (tab: "free" | "trade") => void;
  selectedSearch: "title" | "writer" | "tags";
  onSearchClick: (search: "title" | "writer" | "tags") => void;
  onSearchSubmit: () => void;
  setSearchQuery: (query: string) => void;
}

const CommuHome = ({
  selectedTab,
  onTabClick,
  selectedSearch,
  onSearchClick,
  onSearchSubmit,
  setSearchQuery,
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
          onClick={() => onSearchClick("tags")}
          className={`inline-block px-2 py-1 text-sm font-kbogothiclight border border-green-900 rounded-lg ${
            selectedSearch === "tags" ? "bg-green-900 text-white" : "text-green-900"
          }`}
        >
          태그
        </button>
      </div>
      <div className="relative w-full mx-auto">
        <input
          type="text"
          placeholder="검색어를 입력해 주세요"
          className="w-full px-4 py-4 border font-kbogothiclight border-gray-200 rounded-lg focus:outline-none focus:border-green-900"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon
          className="absolute h-4 w-4 right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={onSearchSubmit} // 아이콘 클릭 시 검색
        />
      </div>
    </div>
  );
};

export default CommuHome;
