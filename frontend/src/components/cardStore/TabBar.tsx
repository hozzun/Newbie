import { useState } from "react";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";

interface TabBarProps {
  className?: string;
}

const tabBarItems: Array<string> = ["투수", "내야수", "외야수", "포수"];

const TabBar = (props: TabBarProps) => {
  const [clickedIndex, setClickedIndex] = useState<number>(0);

  const handleTabBar = (index: number) => {
    setClickedIndex(index);
    // TODO: GET - 해당 분류로 선수 카드
    console.log(`${tabBarItems[index]} 선수 카드 조회`);
  };

  return (
    <div className={`${props.className} flex flex-row justify-start w-full space-x-3`}>
      {tabBarItems.map((tabBarItem, index) => (
        <Button
          key={index}
          variant={
            clickedIndex === index
              ? BUTTON_VARIANTS.clickedTabBar
              : BUTTON_VARIANTS.nonClickedTabBar
          }
          onClick={() => handleTabBar(index)}
        >
          {tabBarItem}
        </Button>
      ))}
    </div>
  );
};

export default TabBar;
