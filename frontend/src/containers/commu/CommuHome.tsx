import { useState } from "react";
import CommuHomeComponent from "../../components/commu/CommuHome";
import CommuFree from "./CommuFree";
import CommuTrade from "./CommuTrade";
import CommuFAB from "./CommuFAB";
import axiosInstance from "../../util/axiosInstance";

const CommuHome = () => {
  const [selectedTab, setSelectedTab] = useState<"free" | "trade">("free");
  const [selectedSearch, setSelectedSearch] = useState<"title" | "writer" | "tags">("title");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabClick = (tab: "free" | "trade") => {
    setSelectedTab(tab);
  };

  const handleSearchClick = (search: "title" | "writer" | "tags") => {
    setSelectedSearch(search);
  };

  const getSearch = async () => {
    const params = {
      keyword: searchQuery,
      type: selectedSearch,
    };

    try {
      const response = await axiosInstance.get("/api/v1/board/general-board/search", { params });
      console.log("검색 결과:", response.data);
      return response.data;
    } catch (error) {
      console.error("검색 중 에러 발생:", error);
    }
  };

  const handleSearch = () => {
    if (selectedTab === "free") {
      getSearch(); // 자유 게시글 검색
    } else if (selectedTab === "trade") {
      // 중고거래 게시글 검색 로직을 여기에 추가할 수 있습니다.
      console.log("중고거래 게시글 검색 로직 구현 필요");
    }
  };

  return (
    <>
      <CommuHomeComponent
        selectedTab={selectedTab}
        onTabClick={handleTabClick}
        selectedSearch={selectedSearch}
        onSearchClick={handleSearchClick}
        onSearchSubmit={handleSearch}  // onSearchSubmit을 handleSearch로 연결
        setSearchQuery={setSearchQuery}
      />
      {selectedTab === "free" && <CommuFree searchQuery={searchQuery} />}
      {selectedTab === "trade" && <CommuTrade searchQuery={searchQuery} />}
      <CommuFAB selectedTab={selectedTab} />
    </>
  );
};

export default CommuHome;
