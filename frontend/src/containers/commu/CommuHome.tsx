import { useState } from "react";
import CommuHomeComponent from "../../components/commu/CommuHome";
import CommuFree from "./CommuFree";
import CommuTrade from "./CommuTrade";
import CommuFAB from "./CommuFAB";
import axiosInstance from "../../util/axiosInstance";

const CommuHome = () => {
  const [selectedTab, setSelectedTab] = useState<"free" | "trade">("free");
  const [selectedSearch, setSelectedSearch] = useState<"title" | "username" | "tags">("title");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabClick = (tab: "free" | "trade") => {
    setSelectedTab(tab);
  };

  const handleSearchClick = (search: "title" | "username" | "tags") => {
    setSelectedSearch(search);
  };

  const getFreeSearch = async () => {
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

  const getUsedSearch = async () => {
    const params = {
      keyword: searchQuery,
      type: selectedSearch,
    };

    try {
      const response = await axiosInstance.get("/api/v1/board/used-board/search", { params });
      console.log("검색 결과:", response.data);
      return response.data;
    } catch (error) {
      console.error("검색 중 에러 발생:", error);
    }
  };

  const handleSearch = () => {
    if (selectedTab === "free") {
      getFreeSearch(); // 자유 게시글 검색
    } else if (selectedTab === "trade") {
      getUsedSearch();
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
