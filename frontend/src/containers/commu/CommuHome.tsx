import { useState } from "react";
import CommuHomeComponent from "../../components/commu/CommuHome";
import CommuFree from "./CommuFree";
import CommuTrade from "./CommuTrade";
import CommuFAB from "./CommuFAB";

const CommuHome = () => {
  const [selectedTab, setSelectedTab] = useState<"free" | "trade">("free");
  const [selectedSearch, setSelectedSearch] = useState<"title" | "writer" | "tag">("title");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabClick = (tab: "free" | "trade") => {
    setSelectedTab(tab);
  };

  const handleSearchClick = (search: "title" | "writer" | "tag") => {
    setSelectedSearch(search);
  };

  const handleSearch = () => {
    if (selectedTab === "free") {
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
