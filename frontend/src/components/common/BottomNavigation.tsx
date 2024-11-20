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

interface BottomNavigationProps {
  clickedButtonIndex: number;
  onButtonClick: (index: number) => void;
}

const BottomNavigation = (props: BottomNavigationProps) => {
  return (
    <div className="w-full max-w-[600px] min-w-[320px] left-1/2 transform -translate-x-1/2 mx-auto justify-between items-center fixed bottom-0 bg-white rounded-t-2xl border-t border-gray-200/50">
      <div className="flex justify-around p-1.5">
        {bottomNavigationButtonItems.map((bottomNavigationButtonItem, index) => (
          <BottomNavigationButton
            item={bottomNavigationButtonItem}
            isClicked={index === props.clickedButtonIndex}
            onClick={() => props.onButtonClick(index)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
