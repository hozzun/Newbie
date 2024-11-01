// TODO: bottom navigation 버튼 기능 구현하기

import { useState } from "react";
import BottomNavigationButton, { BottomNavigationButtonItem } from "./BottomNavigationButton";
import Flag from "../../assets/icons/flag.svg?react";
import FlagSolid from "../../assets/icons/flag-solid.svg?react";
import Music from "../../assets/icons/music.svg?react";
import MusicSolid from "../../assets/icons/music-solid.svg?react";
import Home from "../../assets/icons/home.svg?react";
import HomeSolid from "../../assets/icons/home-solid.svg?react";
import World from "../../assets/icons/world.svg?react";
import WorldSolid from "../../assets/icons/world-solid.svg?react";
import User from "../../assets/icons/user.svg?react";
import UserSolid from "../../assets/icons/user-solid.svg?react";

const bottomNavigationButtonItems: Array<BottomNavigationButtonItem> = [
  {
    nonClickedImg: Flag,
    clickedImg: FlagSolid,
    title: "구단",
  },
  {
    nonClickedImg: Music,
    clickedImg: MusicSolid,
    title: "응원가",
  },
  {
    nonClickedImg: Home,
    clickedImg: HomeSolid,
    title: "홈",
  },
  {
    nonClickedImg: World,
    clickedImg: WorldSolid,
    title: "소통",
  },
  {
    nonClickedImg: User,
    clickedImg: UserSolid,
    title: "마이페이지",
  },
];

const BottomNavigation = () => {
  const [clickedButtonIndex, setClickedButtonIndex] = useState<number>(2);

  const handleButtonClick = (index: number) => {
    setClickedButtonIndex(index);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg border-t border-gray-100">
      <div className="flex justify-around p-3">
        {bottomNavigationButtonItems.map((bottomNavigationButtonItem, index) => (
          <BottomNavigationButton
            item={bottomNavigationButtonItem}
            isClicked={index === clickedButtonIndex}
            onClick={() => handleButtonClick(index)}
            key={index}
          ></BottomNavigationButton>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
