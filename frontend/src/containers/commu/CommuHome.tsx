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
      type: selectedSearch
    };

    try {
      const response = await axiosInstance.get("/api/v1/board/general-board/search", { params });
      console.log('검색', response.data)
      return response.data
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleSearch = () => {
    if (selectedTab === "free") {
      getSearch()
      // CommuFree의 검색 로직 호출
    } else if (selectedTab === "trade") {
      // CommuTrade의 검색 로직 호출
    }
  };

  return (
    <>
      <CommuHomeComponent
        selectedTab={selectedTab}
        onTabClick={handleTabClick}
        selectedSearch={selectedSearch}
        onSearchClick={handleSearchClick}
        onSearchSubmit={handleSearch}
        setSearchQuery={setSearchQuery}
      />
      {selectedTab === "free" && <CommuFree searchQuery={searchQuery} />}
      {selectedTab === "trade" && <CommuTrade searchQuery={searchQuery} />}
      <CommuFAB selectedTab={selectedTab} />
    </>
  );
};

export default CommuHome;
