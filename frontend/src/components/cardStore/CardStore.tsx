import Coin from "../../assets/icons/copyright-solid.svg?react";
import TabBar from "./TabBar";

const CardStore = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">스토어</p>
        <div className="flex flex-row items-center">
          <Coin className="text-warning w-4 h-4 mr-2" />
          <p className="text-base font-kbogothicmedium text-gray-700">3,000</p>
        </div>
      </div>
      <TabBar />
    </div>
  );
};

export default CardStore;
