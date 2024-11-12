import { useState } from "react";
import CommuHomeComponent from "../../components/commu/CommuHome";
import CommuFree from "./CommuFree";
import CommuTrade from "./CommuTrade";
import CommuFAB from "./CommuFAB";

const CommuHome = () => {
  const [selectedTab, setSelectedTab] = useState<"free" | "trade">("free");
  const [selectedSearch, setSelectedSearch] = useState<"title" | "writer" | "tag">("title");

  const handleTabClick = (tab: "free" | "trade") => {
    setSelectedTab(tab);
  };
  const handleSearchClick = (search: "title" | "writer" | "tag") => {
    setSelectedSearch(search);
  };

  return (
    <>
      <CommuHomeComponent
        selectedTab={selectedTab}
        onTabClick={handleTabClick}
        selectedSearch={selectedSearch}
        onSearchClick={handleSearchClick}
      />
      {selectedTab === "free" && <CommuFree />}
      {selectedTab === "trade" && <CommuTrade />}
      <CommuFAB selectedTab={selectedTab} />
    </>
  );
};

export default CommuHome;
