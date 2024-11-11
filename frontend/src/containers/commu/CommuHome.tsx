import { useState } from "react";
import CommuHomeComponent from "../../components/commu/CommuHome";
import CommuFree from "./CommuFree";
import CommuTrade from "./CommuTrade";

const CommuHome = () => {
  const [selectedTab, setSelectedTab] = useState<"free" | "trade">("free");

  const handleTabClick = (tab: "free" | "trade") => {
    setSelectedTab(tab);
  };
  return (
    <>
      <CommuHomeComponent selectedTab={selectedTab} onTabClick={handleTabClick} />
      {selectedTab === "free" && <CommuFree />}
      {selectedTab === "trade" && <CommuTrade />}
    </>
  );
};

export default CommuHome;
